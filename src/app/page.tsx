"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Flag,
  Users,
  Zap,
  ArrowUpRight,
  ToggleLeft,
  ToggleRight,
  FlaskConical,
  ArrowRight,
  Check,
  Crown,
  Quote,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
import { useFeatureFlags } from "@/services/flag-context";

import { AIChatWidget } from "@/components/ai-chat-widget";

// ─── Data ───

const stats = [
  { title: "Active Flags", value: "24", change: "+3", icon: Flag },
  { title: "Experiments", value: "7", change: "+2", icon: FlaskConical },
  { title: "Users Targeted", value: "12.4K", change: "+18%", icon: Users },
  { title: "Avg Latency", value: "4ms", change: "-12%", icon: Zap },
];

const evaluationData = [
  { day: "Mon", evaluations: 14200 },
  { day: "Tue", evaluations: 18500 },
  { day: "Wed", evaluations: 16800 },
  { day: "Thu", evaluations: 22100 },
  { day: "Fri", evaluations: 19400 },
  { day: "Sat", evaluations: 8200 },
  { day: "Sun", evaluations: 6100 },
];

const experimentData = [
  { name: "Checkout V2", control: 68, variant: 72 },
  { name: "Hero Banner", control: 45, variant: 52 },
  { name: "Pricing", control: 31, variant: 29 },
  { name: "Onboarding", control: 78, variant: 84 },
  { name: "Nav Layout", control: 56, variant: 61 },
];

const recentFlags = [
  { name: "enable-ai-assistant", status: true, env: "Production", time: "2m ago" },
  { name: "new-dashboard-layout", status: false, env: "Staging", time: "1h ago" },
  { name: "premium-analytics", status: true, env: "Production", time: "3h ago" },
  { name: "checkout-v2", status: true, env: "Dev", time: "5h ago" },
  { name: "dark-mode-beta", status: false, env: "Staging", time: "1d ago" },
  { name: "user-segmentation", status: true, env: "Production", time: "2d ago" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO at Acme", text: "FlagUI cut our release anxiety by 90 percent. We ship daily now." },
  { name: "Marcus Johnson", role: "Lead Dev at Startup.io", text: "The debug panel alone saved us 20 hours a week." },
  { name: "Priya Patel", role: "PM at BigCorp", text: "A/B testing has never been this intuitive. Complete game changer." },
];

const pricingPlans = [
  { name: "Starter", price: "Free", features: ["5 flags", "1K evaluations/mo", "1 environment", "Community support"], highlighted: false },
  { name: "Pro", price: "$49", period: "/mo", features: ["Unlimited flags", "100K evaluations/mo", "5 environments", "A/B testing", "Priority support"], highlighted: true },
];

const enterprisePlan = {
  name: "Enterprise", price: "$199", period: "/mo",
  features: ["Everything in Pro", "Unlimited evaluations", "SSO & RBAC", "Custom integrations", "Dedicated support", "SLA guarantee"],
  highlighted: false,
};

// ─── Components ───

function AnnouncementBanner() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3 sm:py-2.5 gap-3 sm:gap-0">
      <div className="flex items-start sm:items-center gap-3">
        <Activity className="h-4 w-4 text-muted-foreground shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">LaunchDarkly integration</span> is now available. Connect your account to sync flags.
        </p>
      </div>
      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground shrink-0 gap-1">
        Learn more <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  );
}

function HeroA() {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-8">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Welcome back</p>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
        Ship with confidence
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        24 flags active across 3 environments. Your feature flags are keeping 12.4K users safe. Toggle the debug panel to experiment in real-time.
      </p>
      <div className="flex gap-3">
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs gap-1.5">
          <Flag className="h-3 w-3" /> Create Flag
        </Button>
        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground h-8 text-xs">
          View Docs
        </Button>
      </div>
    </div>
  );
}

function HeroB() {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground font-medium">All systems operational</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
            Overview
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            7 experiments running. Your <span className="text-foreground font-medium">Checkout V2</span> experiment shows +5.8% conversion improvement.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-center p-5 rounded-xl border border-border bg-muted/50">
          <span className="text-3xl font-bold text-foreground tabular-nums">98.2%</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Uptime</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat, gradient, animated }: { stat: (typeof stats)[0]; gradient: boolean; animated: boolean }) {
  const Icon = stat.icon;
  return (
    <Card className={`${animated ? "hover:-translate-y-0.5 transition-transform duration-200" : ""} ${gradient ? "bg-gradient-to-b from-muted/50 to-transparent" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground/80" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tabular-nums">{stat.value}</div>
        <div className="flex items-center gap-1 mt-1">
          <ArrowUpRight className="h-3 w-3 text-emerald-500" />
          <span className="text-xs text-emerald-500">{stat.change}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function EvaluationsChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Flag Evaluations</CardTitle>
        <CardDescription className="text-xs">Daily SDK evaluation count</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evaluationData}>
              <defs>
                <linearGradient id="evalFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 0%, 45%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(0, 0%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 15%)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 7%)",
                  border: "1px solid hsl(0, 0%, 15%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 80%)",
                  fontSize: 11,
                }}
              />
              <Area type="monotone" dataKey="evaluations" stroke="hsl(0, 0%, 55%)" strokeWidth={1.5} fill="url(#evalFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ExperimentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">A/B Results</CardTitle>
        <CardDescription className="text-xs">Conversion rate by variant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={experimentData} layout="vertical" barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 15%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(0, 0%, 40%)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 7%)",
                  border: "1px solid hsl(0, 0%, 15%)",
                  borderRadius: "8px",
                  color: "hsl(0, 0%, 80%)",
                  fontSize: 11,
                }}
              />
              <Bar dataKey="control" fill="hsl(0, 0%, 30%)" radius={[0, 4, 4, 0]} name="Control" />
              <Bar dataKey="variant" fill="hsl(0, 0%, 55%)" radius={[0, 4, 4, 0]} name="Variant" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentFlagsTable({ animated }: { animated: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        <CardDescription className="text-xs">Latest flag updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-0.5">
          {recentFlags.map((flag) => (
            <div
              key={flag.name}
              className={`flex items-center justify-between rounded-md px-2.5 py-2 ${animated ? "hover:bg-muted transition-colors" : ""}`}
            >
              <div className="flex items-center gap-2.5">
                {flag.status ? (
                  <ToggleRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ToggleLeft className="h-4 w-4 text-muted-foreground/60" />
                )}
                <div>
                  <p className="text-xs font-medium font-mono text-foreground">{flag.name}</p>
                  <p className="text-[10px] text-muted-foreground">{flag.env}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    flag.status
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {flag.status ? "ON" : "OFF"}
                </span>
                <span className="text-[10px] text-muted-foreground w-12 text-right tabular-nums">{flag.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PricingSection({ showEnterprise }: { showEnterprise: boolean }) {
  const plans = showEnterprise ? [...pricingPlans, enterprisePlan] : pricingPlans;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">Pricing</CardTitle>
          {showEnterprise && (
            <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium bg-muted text-foreground">
              <Crown className="h-2.5 w-2.5" /> NEW
            </span>
          )}
        </div>
        <CardDescription className="text-xs">Choose a plan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 ${showEnterprise ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-4 ${
                plan.highlighted
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-muted/30"
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground mb-1">{plan.name}</p>
              <div className="flex items-baseline gap-0.5 mb-3">
                <span className="text-xl font-semibold text-foreground">{plan.price}</span>
                {"period" in plan && <span className="text-xs text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-muted-foreground/80 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
        <CardDescription className="text-xs">What developers say</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-lg border border-border bg-muted/30 p-4">
              <Quote className="h-4 w-4 text-muted-foreground/50 mb-3" />
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{t.text}</p>
              <div>
                <p className="text-xs font-medium text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground/80">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ───

export default function DashboardPage() {
  const flags = useFeatureFlags();

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 pb-24 max-w-[1200px] mx-auto">
      {flags["show-announcement-banner"] && <AnnouncementBanner />}

      {flags["hero-variant"] === "A" ? <HeroA /> : <HeroB />}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            stat={stat}
            gradient={flags["enable-gradient-cards"]}
            animated={flags["enable-animations"]}
          />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <EvaluationsChart />
        <ExperimentChart />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <RecentFlagsTable animated={flags["enable-animations"]} />
        <PricingSection showEnterprise={flags["show-premium-pricing"]} />
      </div>

      {flags["show-testimonials"] && <TestimonialsSection />}

      {flags["enable-ai-chat"] && <AIChatWidget />}

    </div>
  );
}
