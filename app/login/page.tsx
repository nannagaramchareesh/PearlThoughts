"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import doctorAnimation from "./doctor.json";
import { useAuth } from "@/context/AuthContext";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔐 1. Check Admin
      if (
        email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ) {
        login({
          id: 0,
          email,
          role: "admin",
        });

        if (remember) localStorage.setItem("rememberedEmail", email);
        else localStorage.removeItem("rememberedEmail");

        router.push("/dashboard");
        setLoading(false);
        return;
      }

      // 👨‍⚕️ 2. Check Doctors
      const doctorRes = await fetch(`/api/doctors`);
      const doctors = await doctorRes.json();

      const foundDoctor = doctors.find(
        (d: any) => d.email === email && d.password === password,
      );

      if (foundDoctor) {
        login({
          id: foundDoctor.id,
          email: foundDoctor.email,
          role: "doctor",
        });
        router.push("/dashboard/doctors");
        setLoading(false);
        return;
      }

      // 👤 3. Check Users
      const userRes = await fetch(`/api/users`);
      const users = await userRes.json();

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password,
      );

      if (foundUser) {
        login({
          id: foundUser.id,
          email: foundUser.email,
          role: "user",
        });
        router.push("/dashboard");
        setLoading(false);
        return;
      }

      alert("Invalid credentials ❌");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 bg-white/60 backdrop-blur-md shadow-sm px-10 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-blue-600">PearlThough</h1>
        <div className="space-x-6 text-gray-600 hidden md:block">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="hover:text-blue-600 cursor-pointer">Doctors</span>
          <span className="hover:text-blue-600 cursor-pointer">Contact</span>
        </div>
      </nav>

      <div className="flex pt-24">
        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center px-10">
          <div className="w-[80%]">
            <Lottie animationData={doctorAnimation} loop />
          </div>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4">
            Your Health, Our Priority
          </h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            Book appointments, consult doctors, and manage your medical records
            in one beautiful platform.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-md border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 mb-6">
              Login to continue your health journey
            </p>

            {/* EMAIL */}
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative mb-5">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* REMEMBER */}
            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember me
              </label>

              <span className="text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
