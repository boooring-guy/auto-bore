// Auth module barrel exports
export * from "./logic/schemas";

// Hooks
export { useUser } from "./hooks/useUser";
export { useAuth } from "./hooks/useAuth";

// Components
export { LoginForm } from "./components/LoginForm";
export { SignUpForm } from "./components/SignUpForm";
export { LoginPageView } from "./views/LoginPageView";
export { SignUpPageView } from "./views/SignUpPageView";
export { AuthFooter } from "./components/AuthFooter";
export { DecorativePanel } from "./components/DecorativePanel";

// Auth Buttons
export { SignInButton } from "./components/SignInButton";
export type { SignInButtonProps } from "./components/SignInButton";
export { SignOutButton } from "./components/SignOutButton";
export type { SignOutButtonProps } from "./components/SignOutButton";
export { LoginButton } from "./components/LoginButton";
export type { LoginButtonProps } from "./components/LoginButton";

// Auth Guards
export { AuthGuard, UserSignedIn } from "./components/AuthGuard";
export type { AuthGuardProps } from "./components/AuthGuard";
export { UserSignedOut, WhenNotSignedIn } from "./components/UserSignedOut";
export type { UserSignedOutProps } from "./components/UserSignedOut";

// Profile Button
export { ProfileButton } from "./components/ProfileButton";
export type { ProfileButtonProps } from "./components/ProfileButton";

// Already Authenticated Warning
export { AlreadyAuthenticatedWarning } from "./components/AlreadyAuthenticatedWarning";
export type { AlreadyAuthenticatedWarningProps } from "./components/AlreadyAuthenticatedWarning";
