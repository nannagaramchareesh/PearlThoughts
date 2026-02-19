"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail:any = localStorage.getItem("userEmail");

    if (!isLoggedIn) {
      router.push("/"); // redirect if not logged in
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-sm px-10 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">PearlThough</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </nav>

      {/* CONTENT */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center border border-gray-200 max-w-md w-full">

          <h2 className="text-3xl font-bold text-[#0F172A] mb-3">
            ✅ Authenticated Successfully
          </h2>

          <p className="text-gray-600 mb-6">
            Welcome back,
            <span className="font-semibold text-blue-600"> {email}</span>
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
