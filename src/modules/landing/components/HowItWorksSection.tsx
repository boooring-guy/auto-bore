"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Webhook, Box, PlayCircle } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
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
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes, automate in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
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
  );
}

