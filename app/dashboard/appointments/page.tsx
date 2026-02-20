  export const dynamic = "force-dynamic";

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Star } from "lucide-react";
import { format, addDays } from "date-fns";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  rating: number;
  location: string;
  slots: {
    morning: string[];
    evening: string[];
  };
};

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");

  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(new Date(), i)
  );

  // ✅ fetch from NEXT API
  useEffect(() => {
    if (!doctorId) return;

    fetch(`/api/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        // fallback defaults if missing
        const safeDoctor = {
          ...data,
          rating: data.rating || 4.5,
          location: data.location || "City Hospital",
          slots: data.slots || {
            morning: ["10:00 AM", "11:30 AM"],
            evening: ["4:00 PM", "6:00 PM"],
          },
        };
        setDoctor(safeDoctor);
      });
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className="p-20 text-center text-blue-600 animate-pulse font-medium">
        Loading specialist details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 pb-24">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b px-4 py-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold text-slate-800">
          Book Appointment
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-6 space-y-8">

        {/* DOCTOR PROFILE */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
            {doctor.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {doctor.name}
            </h2>
            <p className="text-blue-600 text-sm font-medium">
              {doctor.speciality}
            </p>

            <div className="flex gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {doctor.rating}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {doctor.location}
              </span>
            </div>
          </div>
        </div>

        {/* DATE PICKER */}
        <section>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-slate-800">
              Select Date
            </h3>
            <span className="text-blue-600 text-sm">
              {format(selectedDate, "MMMM yyyy")}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {days.map((day) => {
              const selected =
                format(day, "dd") === format(selectedDate, "dd");

              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`w-16 py-3 rounded-xl border text-sm font-semibold ${
                    selected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <div>{format(day, "EEE")}</div>
                  <div className="font-bold">
                    {format(day, "dd")}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SLOTS */}
        <section className="space-y-6">
          <h3 className="font-bold text-slate-800">
            Available Slots
          </h3>

          {/* MORNING */}
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase">
              Morning
            </p>
            <div className="grid grid-cols-3 gap-3">
              {doctor.slots.morning.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-lg text-sm border ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* EVENING */}
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase">
              Evening
            </p>
            <div className="grid grid-cols-3 gap-3">
              {doctor.slots.evening.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-lg text-sm border ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CONFIRM BUTTON */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:relative md:bg-transparent md:border-none">
          <Button
            disabled={!selectedSlot}
            className="w-full h-14 text-lg rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            Confirm Appointment ({selectedSlot || "Select time"})
          </Button>
        </div>
      </div>
    </div>
  );
}