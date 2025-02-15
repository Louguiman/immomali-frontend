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
  }, [isAuthenticated]);

  const hasAccess =
    isAuthenticated &&
    user?.roles?.some((role) => allowedRoles.includes(role.name));

  return hasAccess ? <>{children}</> : null;
};

export default ProtectedRoute;
