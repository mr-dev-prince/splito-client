// AuthBootstrap.tsx
import { useAuth } from "@clerk/clerk-react";
import { useEffect, type ReactNode } from "react";
import { setAuthTokenGetter } from "./auth-token";

interface AuthProviderProps {
  children: ReactNode;
}

export const ClerkTokenProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    setAuthTokenGetter(getToken);
  }, [isLoaded, isSignedIn, getToken]);

  return children;
};
