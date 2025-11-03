"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Workflow,
  Globe,
  Zap,
  Shield,
  BarChart3,
  GitBranch,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description:
        "Drag and drop your way to powerful automations. No coding required.",
    },
    {
      icon: Globe,
      title: "1000+ Integrations",
      description:
        "Connect with your favorite apps and services in seconds.",
    },
    {
      icon: Zap,
      title: "Real-Time Execution",
      description: "Your workflows run instantly when triggered. Zero delays.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and compliance with industry standards.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track performance, monitor executions, and optimize your workflows.",
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description:
        "Test, deploy, and rollback your workflows with confidence.",
    },
  ];

  return (
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
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

