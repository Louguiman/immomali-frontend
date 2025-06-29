"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
// Define the auth state shape
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the root state
export interface RootState {
  auth: AuthState;
  // Add other slices of state as needed
}

interface Role {
  id: string;
  name: string;
  description?: string;
}

interface User {
  id: string;
  email: string;
  roles: Role[];
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({
  children,
  allowedRoles = ["user", "admin", "agent", "agency"],
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    console.log("ProtectedRoute: isAuthenticated:", isAuthenticated);

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const hasAccess =
    isAuthenticated &&
    user?.roles?.some((role: Role) => allowedRoles.includes(role.name));

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return hasAccess ? (
    <>{children}</>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p>You don&apos;t have permission to access this page.</p>
      </div>
    </div>
  );
};

export default ProtectedRoute;
