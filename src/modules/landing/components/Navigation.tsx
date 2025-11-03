"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useAuth, ProfileButton, LoginButton } from "@/modules/auth";

export function Navigation() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-lg bg-linear-to-br from-primary to-primary/60">
                <Zap className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Auto_bore
              </span>
            </Link>
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
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-muted animate-pulse" />
              </div>
            ) : isAuthenticated ? (
              <ProfileButton size="default" />
            ) : (
              <>
                <LoginButton variant="ghost" size="sm">
                  Log in
                </LoginButton>
                <Button size="sm" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
