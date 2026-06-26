"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Crown,
  Calendar,
  Clock,
  MessageCircle,
  Download,
  Bell,
  BookOpen,
  TrendingUp,
  LogOut,
  Settings,
  User,
  CreditCard,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared";

// Mock data
const userData = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  membership: {
    plan: "Quarterly",
    status: "active" as const,
    startDate: "2026-05-01",
    endDate: "2026-08-01",
    daysRemaining: 36,
    telegramConnected: true,
  },
};

const announcements = [
  {
    id: "1",
    title: "Market Holiday Notice",
    content: "Markets will remain closed on July 1st for scheduled maintenance.",
    date: "2026-06-25",
    type: "info" as const,
  },
  {
    id: "2",
    title: "New Feature: Weekly Reports",
    content: "We now provide weekly performance summary reports every Saturday.",
    date: "2026-06-22",
    type: "update" as const,
  },
];

const paymentHistory = [
  {
    id: "1",
    date: "2026-05-01",
    amount: 810,
    plan: "Quarterly Plan",
    status: "completed" as const,
  },
  {
    id: "2",
    date: "2026-02-01",
    amount: 300,
    plan: "Monthly Plan",
    status: "completed" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Profile">
                <User className="h-4 w-4" />
              </Button>
              <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome */}
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back, {userData.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here&apos;s an overview of your membership and recent activity.
            </p>
          </motion.div>

          {/* Membership Status Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <Card className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Plan</p>
                    <p className="text-sm font-semibold text-foreground">
                      {userData.membership.plan}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Days Remaining</p>
                    <p className="text-sm font-semibold text-foreground">
                      {userData.membership.daysRemaining} days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Renewal Date</p>
                    <p className="text-sm font-semibold text-foreground">
                      Aug 1, 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Telegram</p>
                    <p className="text-sm font-semibold text-[#10B981]">
                      Connected
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Membership Status Badge */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Membership Active
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your {userData.membership.plan} plan is active and in good standing.
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 hover:bg-[#10B981]/10">
                  Active
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Announcements */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-border h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#2563EB]" />
                    <CardTitle className="text-lg">Recent Announcements</CardTitle>
                  </div>
                  <CardDescription>
                    Latest updates and notices from our team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground">
                          {announcement.title}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(announcement.date).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {announcement.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-11 rounded-xl"
                  >
                    <CreditCard className="h-4 w-4 text-[#2563EB]" />
                    Manage Subscription
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-11 rounded-xl"
                  >
                    <Gift className="h-4 w-4 text-[#F59E0B]" />
                    Referral Program
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-11 rounded-xl"
                  >
                    <MessageCircle className="h-4 w-4 text-[#10B981]" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Payment History */}
          <motion.div variants={itemVariants}>
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#2563EB]" />
                  <CardTitle className="text-lg">Payment History</CardTitle>
                </div>
                <CardDescription>
                  Your recent transactions and invoices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-[#10B981]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {payment.plan}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-foreground">
                          ₹{payment.amount}
                        </span>
                        <Button variant="ghost" size="icon" aria-label="Download invoice">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coming Soon Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <Card className="border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Learning Academy
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs mt-1"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Structured courses on market analysis, options strategies, and risk management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Investment Plans
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-xs mt-1"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Curated long-term investment strategies and portfolio guidance for wealth building.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
