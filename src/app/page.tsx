"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  Workflow,
  Cloud,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Webhook,
  Box,
  PlayCircle,
  BarChart3,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <Zap className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Auto_bore
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#integrations"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Integrations
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="#login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="#signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
              <Sparkles className="size-4 text-primary" />
              <span className="text-sm font-medium">Automate Everything</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">Connect Your Apps</span>
              <span className="block bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Automate Your Workflow
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Build powerful automations without code. Connect apps, services,
              and APIs to create workflows that work for you 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="text-base px-8 h-12 group" asChild>
                <Link href="#signup">
                  Start Automating Free
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 h-12"
                asChild
              >
                <Link href="#demo">
                  <PlayCircle className="mr-2 size-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>5-minute setup</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Workflow Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm p-6 shadow-2xl">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <div
                      className="h-32 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Powerful Automation Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to automate your workflows and boost
              productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <Workflow className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Visual Workflow Builder
                </CardTitle>
                <CardDescription className="text-base">
                  Drag and drop your way to powerful automations. No coding
                  required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <Globe className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">1000+ Integrations</CardTitle>
                <CardDescription className="text-base">
                  Connect with your favorite apps and services in seconds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">w
              <CardHeader>
                <div className="size-12 rounded-lg bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <Zap className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Real-Time Execution</CardTitle>
                <CardDescription className="text-base">
                  Your workflows run instantly when triggered. Zero delays.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <Shield className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Enterprise Security</CardTitle>
                <CardDescription className="text-base">
                  Bank-level encryption and compliance with industry standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Advanced Analytics</CardTitle>
                <CardDescription className="text-base">
                  Track performance, monitor executions, and optimize your
                  workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <GitBranch className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Version Control</CardTitle>
                <CardDescription className="text-base">
                  Test, deploy, and rollback your workflows with confidence.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes, automate in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Trigger",
                description:
                  "Select when your workflow should start - a new email, form submission, or any event.",
                icon: Webhook,
              },
              {
                step: "02",
                title: "Add Your Actions",
                description:
                  "Connect apps and define what should happen. Send notifications, update databases, create tasks.",
                icon: Box,
              },
              {
                step: "03",
                title: "Activate & Run",
                description:
                  "Turn on your workflow and let it run. Monitor executions and get insights in real-time.",
                icon: PlayCircle,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 top-0 text-6xl font-bold text-muted/20">
                  {item.step}
                </div>
                <Card className="relative border-2 h-full">
                  <CardHeader>
                    <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section
        id="integrations"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Connect Everything
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrate with your favorite tools and services
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <Card
                key={i}
                className="aspect-square flex items-center justify-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                  <div className="size-12 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <Box className="size-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium text-center">
                    Integration {i + 1}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="#all-integrations">
                View All Integrations
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
            <CardContent className="relative p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                <Zap className="size-8 text-primary" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Ready to Automate?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of teams automating their workflows with
                  Auto_bore
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="text-base px-8 h-12 group" asChild>
                  <Link href="#signup">
                    Get Started Free
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12"
                  asChild
                >
                  <Link href="#contact">Talk to Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-primary to-primary/60">
                  <Zap className="size-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Auto_bore</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Automate your workflow, amplify your productivity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#integrations"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#careers"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#support"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Auto_bore. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="#privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
