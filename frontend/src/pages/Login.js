import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      try {
        setLoading(!loading);
        const response = await axios.post(
          process.env.REACT_APP_API_URI + "/api/v1/auth/login",
          body
        );
        console.log("response", response);
        if (response.status === 200 && response.data.token) {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/";
          setLoading(!loading);
        }
      } catch (error) {
        console.error("error while login :", error);
      } finally {
        setLoading(!loading);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-[#5C218B] opacity-20"></div>

      {!isForgotPassword && (
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-16 relative ml-24">
          <div className="text-center mb-6">
            <div
              className="flex justify-center items-center w-[238px] h-[128px] bg-cover bg-center mx-auto"
              style={{ backgroundImage: "url('/logo.png')" }}
            ></div>
            <p className="text-gray-600 text-sm mt-2">
              Welcome to Digitalflake admin
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email-id
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-purple-600 text-sm hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
            >
              {!loading ? "Log In" : "Logging In"}
            </button>
          </form>
        </div>
      )}

      {isForgotPassword && (
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 relative ml-24">
          <div className="text-center mb-6">
            <p className="text-xl mt-2 text-[#5C2188]">
              Did you forget password?
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Enter your email address and we’ll send you a link to restore
              password
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email-id
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 w-full px-4 py-2 border rounded-md focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
            >
              Request reset link
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-gray-400 text-sm hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
