"use client";
import { useLoginMutation } from "@/features/api/auth.api";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Form = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const userRoles = user?.roles?.map((role) => role.name) || [];

  useEffect(() => {
    if (isAuthenticated) {
      if (userRoles.includes("admin")) router.push("/dashboard");
      else if (userRoles.includes("agent")) router.push("/dashboard");
      else router.back();
    }
  }, [isAuthenticated, user, router]);
  const handleSubmit = async (e) => {
    console.log("submit:");

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("submit:", email, password);

    try {
      const data = await login({ email, password }).unwrap();
      localStorage.setItem("token", data.accessToken);
      console.log("log in: ", data);
      toast.success("Login Succesful!");

      // }
    } catch (error) {
      toast.error("Login failed", error);
      console.log("login error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="input-group mb-2 mr-sm-2">
        <input
          name="email"
          type="text"
          className="form-control"
          required
          placeholder="User Name Or Email"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="input-group form-group">
        <input
          name="password"
          type="password"
          className="form-control"
          required
          placeholder="Password"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
        />
        <label
          className="form-check-label form-check-label"
          htmlFor="remeberMe"
        >
          Remember me
        </label>

        <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a>
      </div>
      {/* End .form-group */}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-log w-100 btn-thm"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {/* login button */}

      <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div>
      {/* devider */}

      <div className="row mt25">
        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn-block color-white bgc-fb mb0 w-100"
          >
            <i className="fa fa-facebook float-start mt5"></i> Facebook
          </button>
        </div>
        {/* End .col */}

        <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button>
        </div>
        {/* End .col */}
      </div>
      {/* more signin options */}
    </form>
  );
};

export default Form;
