"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
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
                <Link href="/signup">
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
  );
}

