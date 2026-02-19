"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import doctorAnimation from "./doctor.json"; // add any lottie doctor json here
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("Admin Email:", process.env.NEXT_PUBLIC_ADMIN_EMAIL);
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);
  console.log("Admin Email from env:", process.env.NEXT_PUBLIC_ADMIN_EMAIL);
  console.log("Admin Password from env:", process.env.NEXT_PUBLIC_ADMIN_PASSWORD);

  const handleLogin = (e:any) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        if (remember) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
      setLoading(false);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", "googleuser@gmail.com");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">

      {/* 🌐 GLASS NAVBAR */}
      <nav className="w-full fixed top-0 left-0 bg-white/60 backdrop-blur-md shadow-sm px-10 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-blue-600">PearlThough</h1>
        <div className="space-x-6 text-gray-600 hidden md:block">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="hover:text-blue-600 cursor-pointer">Doctors</span>
          <span className="hover:text-blue-600 cursor-pointer">Contact</span>
        </div>
      </nav>

      <div className="flex pt-24">

        {/* LEFT SIDE ANIMATION */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center px-10">
          <div className="w-[80%]">
            <Lottie animationData={doctorAnimation} loop={true} />
          </div>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4">
            Your Health, Our Priority
          </h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            Book appointments, consult doctors, and manage your medical records
            in one beautiful platform.
          </p>
        </div>

        {/* RIGHT SIDE LOGIN */}
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

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg mb-5 hover:bg-gray-50 transition text-black font-medium"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* FLOATING EMAIL */}
            <div className="relative mb-5">
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-black placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-3.5 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 
              peer-focus:text-sm 
              peer-focus:text-blue-600">
                Email
              </label>
            </div>

            {/* FLOATING PASSWORD */}
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-black placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-3.5 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 
              peer-focus:text-sm 
              peer-focus:text-blue-600">
                Password
              </label>

              {/* EYE ICON */}
              <span
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={()=>setRemember(!remember)}
                />
                Remember me
              </label>

              <span className="text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
