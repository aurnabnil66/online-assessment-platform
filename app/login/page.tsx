"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Phone, Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slices/auth/auth.slice";
import { MOCK_USERS } from "@/utils/mockData";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom/CustomButton";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
    if (!foundUser || foundUser.password !== password) {
      setError("Invalid email or password");
      return;
    }
    dispatch(
      login({
        id: foundUser.id,
        email,
        role: foundUser.role as "EMPLOYER" | "CANDIDATE",
        name: foundUser.name,
      }),
    );
    setError("");
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f0f2f5]">
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Sign In
          </h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white px-8 py-8 shadow-sm"
          >
            {/* Email / User ID */}
            <div className="mb-5">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email/ User ID
              </label>
              <input
                type="text"
                placeholder="Enter your email/User ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

            {/* Forget password */}
            <div className="mb-6 text-right">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Sign In button */}
            <CustomButton>Sign In</CustomButton>
          </form>
        </div>
      </main>
    </div>
  );
}
