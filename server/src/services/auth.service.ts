import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import prisma from "../prisma/client";
import { JwtPayload, TokenPair } from "../types";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../utils/errors";
import { generateReferralCode } from "../utils/helpers";
import dayjs from "dayjs";

export class AuthService {
  async register(name: string, email: string, password: string, referralCode?: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictError("An account with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Generate unique referral code
    const userReferralCode = generateReferralCode(name);

    // Find referrer if referral code provided
    let referrerId: string | undefined;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        referralCode: userReferralCode,
        referredBy: referralCode || null,
      },
    });

    // Create referral record if applicable
    if (referrerId) {
      await prisma.referral.create({
        data: {
          referrerId,
          referredId: user.id,
          status: "PENDING",
        },
      });
    }

    // Generate tokens
    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
      },
      tokens,
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("Your account has been deactivated");
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
      },
      tokens,
    };
  }

  async refreshToken(token: string) {
    // Verify refresh token
    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
    } catch {
      throw new UnauthorizedError("Invalid refresh token");
    }

    // Check if token exists and is not revoked
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!storedToken || storedToken.isRevoked) {
      throw new UnauthorizedError("Refresh token has been revoked");
    }

    if (new Date() > storedToken.expiresAt) {
      throw new UnauthorizedError("Refresh token has expired");
    }

    // Revoke old token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { isRevoked: true },
    });

    // Generate new tokens
    const newTokens = this.generateTokens({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    // Store new refresh token
    await this.storeRefreshToken(payload.userId, newTokens.refreshToken);

    return newTokens;
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      // Revoke specific token
      await prisma.refreshToken.updateMany({
        where: { userId, token: refreshToken },
        data: { isRevoked: true },
      });
    } else {
      // Revoke all tokens for user
      await prisma.refreshToken.updateMany({
        where: { userId, isRevoked: false },
        data: { isRevoked: true },
      });
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError("Current password is incorrect");
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Revoke all refresh tokens (force re-login)
    await prisma.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  // ─── Private Methods ─────────────────────────────────────────────────────────

  private generateTokens(payload: JwtPayload): TokenPair {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as string & { __brand: "StringValue" },
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn as string & { __brand: "StringValue" },
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: string, token: string) {
    const expiresAt = dayjs().add(7, "day").toDate();
    await prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    });
  }
}

export const authService = new AuthService();
