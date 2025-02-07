"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles = ["user"] }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!allowedRoles.includes(user?.role)) {
      router.push("/403"); // Forbidden page
    }
  }, [isAuthenticated, user, router]);

  return isAuthenticated && allowedRoles.includes(user?.role) ? (
    <>{children}</>
  ) : null;
};

export default ProtectedRoute;
