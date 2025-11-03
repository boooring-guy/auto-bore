"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Box, ArrowRight } from "lucide-react";

export function IntegrationsSection() {
  return (
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
  );
}

