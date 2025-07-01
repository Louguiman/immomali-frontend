"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/store";
import { useLogoutMutation } from "@/features/api/auth.api";
import { useEffect } from "react";
import { logoutSuccess } from "@/features/auth/authSlice";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

const LogoutPageContent = () => {
  const t = useTranslations("logout");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(logoutSuccess());
      localStorage.removeItem("persist:root");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      Swal.fire({
        title: t("success"),
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="error_page footer_apps_widget text-center">
      <Image
        width={266}
        height={200}
        className="img-fluid img-thumb contain"
        src="/assets/images/resource/logout.png"
        alt="logout"
      />

      <div className="erro_code">
        <h4>{t("title")}</h4>
      </div>
      <p>{t("message")}</p>

      {isLoggingOut ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </div>
      ) : (
        <div className="col-lg-6 offset-lg-3">
          <p>{t("redirect")}</p>
        </div>
      )}
    </div>
  );
};

export default LogoutPageContent;
