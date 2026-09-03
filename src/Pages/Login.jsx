  import React from "react";
  import { Link } from "react-router";
  import {
    Heart,
    User,
    Lock,
    Eye,
    EyeOff,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import useLogin from "../hooks/useLogin";
  function Login() {
    const {
      formData,
      showPassword,
      loading,
      error,
      handleChange,
      handleSubmit,
      togglePassword,
    } = useLogin();

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-100 px-4 py-16 sm:px-6 lg:py-20">
        <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

            <div className="relative hidden overflow-hidden bg-gradient-to-br from-red-600 to-red-700 p-10 text-white lg:flex lg:flex-col lg:justify-center">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                    <Heart
                      size={32}
                      className="fill-red-600 text-red-600"
                    />
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold">
                      Blood Bank
                    </h1>

                    <p className="mt-1 text-sm text-red-100">
                      Save Lives Together
                    </p>
                  </div>
                </div>

                <h2 className="mt-16 text-5xl font-bold leading-tight">
                  Welcome
                  <br />
                  Back!
                </h2>

                <p className="mt-6 max-w-md text-lg leading-8 text-red-100">
                  Sign in to your account and help connect
                  blood donors with people who need them.
                </p>

                <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">❤️</span>

                    <p className="text-lg font-bold">
                      Every Drop Counts
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-red-100">
                    One blood donation can make a real
                    difference in someone's life.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="mb-8 flex flex-col items-center lg:hidden">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                  <Heart
                    size={32}
                    className="fill-red-600 text-red-600"
                  />
                </div>

                <h1 className="mt-3 text-2xl font-bold text-red-600">
                  Blood Bank
                </h1>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </h2>

                <p className="mt-2 text-gray-500">
                  Login to your Blood Bank account
                </p>
              </div>

              {error && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100">
                    !
                  </span>

                  <p>{error}</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Username
                  </label>

                  <div className="relative">
                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />

                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-red-600"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />

                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-200 transition duration-200 hover:bg-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-red-600 transition hover:text-red-700"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  className="rounded-xl bg-gray-900 px-6 hover:bg-gray-800"
                >
                  <Link
                    to="/"
                    className="text-sm text-white"
                  >
                    ← Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  export default Login;

