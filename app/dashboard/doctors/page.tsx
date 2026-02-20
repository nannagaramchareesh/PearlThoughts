"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 md:px-8 py-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
            Find Your Doctor 👨‍⚕️
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Browse specialists and book appointments easily
          </p>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search by name or speciality..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border-blue-100 focus:ring-blue-400"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-blue-600 mt-20 animate-pulse">
          Loading doctors...
        </div>
      )}

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <Card
              key={doc.id}
              className="rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 bg-white hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                {/* AVATAR */}
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 mb-4 shadow-inner">
                  {doc.name.charAt(0)}
                </div>

                {/* NAME */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {doc.name}
                </h2>

                {/* SPECIALITY */}
                <Badge className="mt-2 bg-blue-50 text-blue-600 border border-blue-200 text-sm px-3 py-1 rounded-full">
                  {doc.speciality}
                </Badge>

                {/* BUTTON */}
                <Button
                  onClick={() =>
                    router.push(`/dashboard/appointments?doctorId=${doc.id}`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white mt-5 w-full rounded-xl shadow-md"
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredDoctors.length === 0 && (
        <div className="text-center text-gray-400 mt-16 text-sm">
          No doctors found 😔
        </div>
      )}
    </div>
  );
}