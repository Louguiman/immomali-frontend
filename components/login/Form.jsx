"use client";
import { useLoginMutation } from "@/features/api/auth.api";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const Form = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const userRoles = user?.roles?.map((role) => role.name) || [];
  const [rememberMe, setRememberMe] = useState(false);
  const t = useTranslations("LoginForm");

  useEffect(() => {
    if (isAuthenticated) {
      if (userRoles.includes("admin")) router.push("/dashboard");
      else if (userRoles.includes("agent")) router.push("/dashboard");
      else router.back();
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = await login({ email, password }).unwrap();
      localStorage.setItem("token", data.accessToken);

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success(t("loginButton") + " " + t("loginSuccess"));
    } catch (error) {
      toast.error(t("loginFailed"));
      console.log("login error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{t("loginTitle")}</h3>
        <p className="text-center">
          {t("signupPrompt")}{" "}
          <Link href="/register" className="text-thm">
            {t("signupLink")}
          </Link>
        </p>
      </div>

      <div className="input-group mb-2 mr-sm-2">
        <input
          name="email"
          type="text"
          className="form-control"
          required
          placeholder={t("emailPlaceholder")}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>

      <div className="input-group form-group">
        <input
          name="password"
          type="password"
          className="form-control"
          required
          placeholder={t("passwordPlaceholder")}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label
          className="form-check-label form-check-label"
          htmlFor="remeberMe"
        >
          {t("rememberMe")}
        </label>

        <a className="btn-fpswd float-end" href="#">
          {t("forgotPassword")}
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-log w-100 btn-thm"
      >
        {isLoading ? t("loggingIn") : t("loginButton")}
      </button>

      <div className="divide">
        <span className="lf_divider">{t("or")}</span>
        <hr />
      </div>

      <div className="row mt25">
        <div className="col-lg-6">
          <button
            type="button"
            className="btn btn-block color-white bgc-fb mb0 w-100"
            // onClick={handleFacebookLogin}
          >
            <i className="fa fa-facebook float-start mt5"></i>{" "}
            {t("loginFacebook")}
          </button>
        </div>

        <div className="col-lg-6">
          <button
            type="button"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
            // onClick={handleGoogleLogin}
          >
            <i className="fa fa-google float-start mt5"></i> {t("loginGoogle")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
