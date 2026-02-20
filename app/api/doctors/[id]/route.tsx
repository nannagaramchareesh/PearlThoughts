import { NextResponse } from "next/server";
import db from "../../../../db.json";

// Define the shape of the params
type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  // 1. Await the params (Required in Next.js 15+)
  const { id } = await params;

  // 2. Find the doctor (Note: use Number(id) if your JSON IDs are numbers)
  const doctor = db.doctors.find((d) => d.id === Number(id));

  if (!doctor) {
    return NextResponse.json(
      { message: "Doctor not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(doctor);
}