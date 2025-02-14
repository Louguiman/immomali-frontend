"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({
  children,
  allowedRoles = ["user", "admin", "agent", "agency"],
}) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
    // } £
  }, [isAuthenticated, user, router]);

  return isAuthenticated && allowedRoles.includes(user?.role) ? (
    <>{children}</>
  ) : null;
};

export default ProtectedRoute;
