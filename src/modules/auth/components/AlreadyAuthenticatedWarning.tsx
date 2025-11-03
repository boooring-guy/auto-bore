"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/modules/auth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface AlreadyAuthenticatedWarningProps {
  /**
   * Redirect to this URL after logout (default: "/")
   */
  redirectTo?: string;
  /**
   * Custom title for the dialog
   */
  title?: string;
  /**
   * Custom description for the dialog
   */
  description?: string;
  /**
   * Whether to show the dialog automatically when authenticated (default: true)
   */
  open?: boolean;
  /**
   * Callback when dialog is closed
   */
  onClose?: () => void;
}

/**
 * Warning dialog component that shows when an authenticated user tries to access auth routes
 *
 * Shows a modal dialog with a warning message and a logout button
 *
 * @example
 * ```tsx
 * // Basic usage - automatically shows when authenticated
 * <AlreadyAuthenticatedWarning />
 *
 * // With custom redirect
 * <AlreadyAuthenticatedWarning redirectTo="/dashboard" />
 *
 * // Controlled open state
 * <AlreadyAuthenticatedWarning open={isOpen} onClose={() => setIsOpen(false)} />
 * ```
 */
export function AlreadyAuthenticatedWarning({
  redirectTo = "/",
  title = "You're already signed in",
  description = "You're already signed in to your account. To continue with a different account, please sign out first.",
  open: controlledOpen,
  onClose,
}: AlreadyAuthenticatedWarningProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Use controlled open if provided, otherwise manage internally
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  useEffect(() => {
    // Automatically open dialog when authenticated (if not controlled)
    if (controlledOpen === undefined && !isLoading && isAuthenticated) {
      setInternalOpen(true);
    }
  }, [isAuthenticated, isLoading, controlledOpen]);

  const handleClose = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onClose?.();
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Failed to sign out");
        setIsSigningOut(false);
        return;
      }

      toast.success("Signed out successfully");
      handleClose();
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
      setIsSigningOut(false);
    }
  };

  const handleCancel = () => {
    handleClose();
    router.push(redirectTo);
  };

  // Don't render if not authenticated or still loading
  if (isLoading || !isAuthenticated || !isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleCancel();
      }
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
              <AlertCircle className="size-5 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle>{title}</AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="pt-2">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isSigningOut}>
            Go to Home
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
          >
            {isSigningOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

