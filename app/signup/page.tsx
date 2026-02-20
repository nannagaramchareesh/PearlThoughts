"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import doctorAnimation from "../login/doctor.json"; // reuse same animation

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleSignup = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  try {
    await fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    setTimeout(() => {
      alert("Signup successful 🎉");
      router.push("/login");
      setLoading(false);
    }, 1000);
  } catch (err) {
    console.error(err);
    alert("Signup failed!");
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#F7FAFC]">

      {/* 🌐 NAVBAR (same as login) */}
      <nav className="w-full fixed top-0 left-0 bg-white/60 backdrop-blur-md shadow-sm px-10 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-blue-600">PearlThough</h1>
        <div className="space-x-6 text-gray-600 hidden md:block">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="hover:text-blue-600 cursor-pointer">Doctors</span>
          <span className="hover:text-blue-600 cursor-pointer">Contact</span>
        </div>
      </nav>

      <div className="flex pt-24">

        {/* LEFT SIDE (same animation section) */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center px-10">
          <div className="w-[80%]">
            <Lottie animationData={doctorAnimation} loop />
          </div>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4">
            Join Your Health Journey 💙
          </h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            Create your account and start booking appointments, consulting
            doctors and managing your health easily.
          </p>
        </div>

        {/* RIGHT SIDE SIGNUP FORM */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <form
            onSubmit={handleSignup}
            className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-md border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
              Create Account ✨
            </h2>
            <p className="text-gray-500 mb-6">
              Sign up to get started with Schedula
            </p>

            {/* EMAIL */}
            <div className="relative mb-5">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
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

            {/* PASSWORD */}
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
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

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* ROLE SELECT */}
            

            {/* SIGNUP BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Creating..." : "Sign Up"}
            </button>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}