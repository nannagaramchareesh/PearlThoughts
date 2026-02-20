import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Path to your db.json in the root folder
const dbPath = path.resolve(process.cwd(), "db.json");

// Helper to read data
async function getDbData() {
  const jsonData = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(jsonData);
}

// 👉 GET: Fetch all doctors from db.json
export async function GET() {
  try {
    const data = await getDbData();
    // Return the doctors array from the file
    return NextResponse.json(data.doctors || []);
  } catch (error) {
    return NextResponse.json({ error: "Could not read doctors" }, { status: 500 });
  }
}

// 👉 POST: Add a new doctor (Optional, if you want an admin feature)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await getDbData();

    const newDoctor = {
      id: data.doctors.length + 1, // Simple ID generation
      ...body
    };

    data.doctors.push(newDoctor);

    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    return NextResponse.json(newDoctor);
  } catch (error) {
    return NextResponse.json({ error: "Could not save doctor" }, { status: 500 });
  }
}