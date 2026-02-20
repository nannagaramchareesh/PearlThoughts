"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, ChevronLeft, Star } from "lucide-react";
import { format, addDays } from "date-fns";

export default function AppointmentsPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");

  // Generate next 7 days for the date picker
  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    if (doctorId) {
      fetch(`http://localhost:3001/doctors/${doctorId}`)
        .then((res) => res.json())
        .then((data) => setDoctor(data));
    }
  }, [doctorId]);

  if (!doctor) return <div className="p-20 text-center animate-pulse text-blue-600 font-medium">Loading specialist details...</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* 1. STICKY HEADER / NAV */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-800">Book Appointment</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-6 space-y-8">
        
        {/* 2. DOCTOR MINI PROFILE */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-200">
              {doctor.name.charAt(4)}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{doctor.name}</h2>
            <p className="text-blue-600 font-medium text-sm">{doctor.speciality}</p>
            <div className="flex items-center gap-3 mt-1 text-slate-400 text-xs">
              <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {doctor.rating}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {doctor.location}</span>
            </div>
          </div>
        </div>

        {/* 3. HORIZONTAL DATE PICKER */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Select Date</h3>
            <span className="text-blue-600 text-sm font-medium">{format(selectedDate, "MMMM yyyy")}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {days.map((day) => {
              const isSelected = format(day, "dd") === format(selectedDate, "dd");
              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`flex-shrink-0 w-16 py-4 rounded-2xl transition-all border ${
                    isSelected 
                    ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 scale-105" 
                    : "bg-white border-slate-100 text-slate-500 hover:border-blue-200"
                  }`}
                >
                  <p className="text-[10px] uppercase font-bold tracking-wider mb-1">
                    {format(day, "EEE")}
                  </p>
                  <p className="text-lg font-black">{format(day, "dd")}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. TIME SLOTS GRID */}
        <section className="space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Available Slots</h3>
          
          <div className="space-y-4">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Morning Sessions</p>
             <div className="grid grid-cols-3 gap-3">
               {doctor.slots.morning.map((slot: string) => (
                 <button
                   key={slot}
                   onClick={() => setSelectedSlot(slot)}
                   className={`py-3 rounded-xl text-sm font-semibold transition-all border ${
                     selectedSlot === slot 
                     ? "bg-slate-900 border-slate-900 text-white ring-4 ring-slate-100" 
                     : "bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
                   }`}
                 >
                   {slot}
                 </button>
               ))}
             </div>
          </div>

          <div className="space-y-4">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evening Sessions</p>
             <div className="grid grid-cols-3 gap-3">
               {doctor.slots.evening.map((slot: string) => (
                 <button
                   key={slot}
                   onClick={() => setSelectedSlot(slot)}
                   className={`py-3 rounded-xl text-sm font-semibold transition-all border ${
                     selectedSlot === slot 
                     ? "bg-slate-900 border-slate-900 text-white ring-4 ring-slate-100" 
                     : "bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-slate-200"
                   }`}
                 >
                   {slot}
                 </button>
               ))}
             </div>
          </div>
        </section>

        {/* 5. FLOATING BOOKING BUTTON */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 md:relative md:bg-transparent md:border-none md:p-0">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
            disabled={!selectedSlot}
          >
            Confirm for {selectedSlot || "..."}
          </Button>
        </div>

      </div>
    </div>
  );
}