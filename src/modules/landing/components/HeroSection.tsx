"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

export function HeroSection() {
  return (
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
              <Link href="/signup">
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
  );
}

