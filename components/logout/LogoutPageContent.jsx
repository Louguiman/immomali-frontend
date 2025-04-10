"use client";
import Link from "next/link";
import Form from "./Form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/features/api/auth.api";
import { useEffect } from "react";
import { logoutSuccess } from "@/features/auth/authSlice";

const LogoutPageContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    // await logout().unwrap();
    dispatch(logoutSuccess());
    // Nettoie le localStorage pour Redux Persist si nécessaire
    localStorage.removeItem("persist:root");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  useEffect(() => {
    // Déconnecte l'utilisateur en dispatchant l'action logout
    handleLogout();
    return () => {};
  }, [dispatch, router]);

  return (
    <div className="error_page footer_apps_widget">
      <Image
        width={266}
        height={200}
        className="img-fluid img-thumb contain"
        src="/assets/images/resource/error.png"
        alt="error.png"
      />
      <div className="erro_code">
        <h1>Ohh! You have been loggged out</h1>
      </div>
      <p>Thank you for your visit! you’re looking for</p>

      {/* <isLoggingOut /> */}
      {isLoggingOut ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="col-lg-6 offset-lg-3">
          <p>Redirecting to home page...</p>
        </div>
      )}

      {/* <Link href="/" className="btn btn_error btn-thm">
        Back To Home
      </Link> */}
    </div>
  );
};

export default LogoutPageContent;
