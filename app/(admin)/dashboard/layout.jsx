import ProtectedRoute from "@/features/auth/ProtectedRoute";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function AdminLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
