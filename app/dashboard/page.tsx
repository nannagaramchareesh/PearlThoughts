"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 md:px-8 py-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user.email.split("@")[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your health dashboard easily
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 text-xs sm:text-sm">
            {user.role.toUpperCase()}
          </Badge>

          <Button
            variant="destructive"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="rounded-xl"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-linear-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <p className="text-sm opacity-80">Appointments</p>
            <h2 className="text-3xl font-bold mt-2">12</h2>
            <p className="text-xs mt-1 opacity-80">+2 this week</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-linear-to-r from-purple-500 to-indigo-500 text-white">
          <CardContent className="p-6">
            <p className="text-sm opacity-80">Doctors Available</p>
            <h2 className="text-3xl font-bold mt-2">24</h2>
            <p className="text-xs mt-1 opacity-80">Updated daily</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md hover:shadow-xl transition bg-linear-to-r from-pink-500 to-rose-500 text-white">
          <CardContent className="p-6">
            <p className="text-sm opacity-80">Reports</p>
            <h2 className="text-3xl font-bold mt-2">8</h2>
            <p className="text-xs mt-1 opacity-80">New uploads</p>
          </CardContent>
        </Card>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-10">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <Button
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/dashboard/doctors")}
          >
            View Doctors
          </Button>

          <Button variant="secondary" className="rounded-xl">
            Book Appointment
          </Button>

          <Button variant="outline" className="rounded-xl">
            View Reports
          </Button>
        </div>
      </div>

      {/* ACTIVITY */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>

        <Card className="rounded-2xl shadow-md bg-white/80 backdrop-blur">
          <CardContent className="p-5 sm:p-6 space-y-4 text-sm sm:text-base">

            <div className="flex justify-between text-gray-600">
              <span>Appointment booked with Dr. Ravi</span>
              <span className="text-xs sm:text-sm">2h ago</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Report uploaded</span>
              <span className="text-xs sm:text-sm">Yesterday</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>New doctor added</span>
              <span className="text-xs sm:text-sm">2 days ago</span>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}