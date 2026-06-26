# Aetheris Markets — Backend API

Production-ready REST API for the Aetheris Markets financial research platform.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js + Express 5 | HTTP Server |
| TypeScript | Type safety |
| Prisma 5 | ORM & database |
| SQLite (dev) / PostgreSQL (prod) | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Zod | Request validation |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| Morgan | Request logging |

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env

# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed test data
pnpm db:seed

# Start development server
pnpm dev
```

Server runs at `http://localhost:4000`

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@aetherismarkets.com | Admin@2026 |
| User | rahul@example.com | User@2026 |

## API Endpoints

### Health
```
GET /health
```

### Authentication (`/api/v1/auth`)
```
POST /register       — Create account
POST /login          — Sign in (returns JWT tokens)
POST /refresh        — Refresh access token
POST /logout         — Revoke tokens
POST /change-password — Update password
GET  /me             — Current user info
```

### Dashboard (`/api/v1/dashboard`)
```
GET  /               — Full dashboard data
GET  /profile        — User profile
PATCH /profile       — Update profile
GET  /announcements  — List announcements
```

### Membership (`/api/v1/membership`)
```
GET  /               — Current membership status
POST /cancel         — Cancel membership
POST /toggle-auto-renew — Toggle auto-renewal
POST /connect-telegram  — Connect Telegram account
```

### Payments (`/api/v1/payments`)
```
POST /create-order   — Create payment order
POST /confirm        — Confirm payment (activates membership)
POST /webhook        — Payment gateway webhook
GET  /history        — Payment history
GET  /invoice/:id    — Download invoice
```

### Admin (`/api/v1/admin`)
```
GET  /stats              — Platform statistics
GET  /users              — List users (paginated, searchable)
GET  /users/:id          — User details
PATCH /users/:id/toggle-status — Activate/deactivate user
POST /announcements      — Create announcement
PATCH /announcements/:id — Update announcement
DELETE /announcements/:id — Delete announcement
GET  /payments           — All payments
```

## Architecture

```
server/
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── config/           # Environment config, constants
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, validation, rate limiting, errors
│   ├── prisma/           # DB client, seed script
│   ├── routes/           # Express routes
│   ├── services/         # Business logic
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Helpers, error classes, response utilities
│   └── index.ts          # Entry point
├── .env.example
├── tsconfig.json
└── package.json
```

## Security

- JWT access + refresh token pattern
- Password hashing with bcryptjs (12 rounds)
- Helmet security headers
- CORS restricted to frontend origin
- Rate limiting (100 req/15min general, 10 req/15min auth)
- Zod request body validation
- SQL injection protection via Prisma ORM

## Production Deployment

1. Switch datasource to PostgreSQL in `schema.prisma`
2. Set production environment variables
3. Run `prisma migrate deploy`
4. Build: `pnpm build`
5. Start: `pnpm start`
