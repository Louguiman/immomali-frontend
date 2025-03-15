"use client";

import { useLogoutMutation } from "@/features/api/auth.api";
import { useRouter } from "@/i18n/navigation";

export default function LogoutButton() {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    await logout().unwrap();
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
