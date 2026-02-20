import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
// Importing like this is fine for the initial structure/types
import db from "../../../../db.json"; 

export async function GET() {
  try {
    // We read fresh from the file in case it changed since the app started
    const dbPath = path.resolve(process.cwd(), "db.json");
    const fileData = await fs.readFile(dbPath, "utf-8");
    const data = JSON.parse(fileData);
    
    return NextResponse.json(data.users || []);
  } catch (error) {
    return NextResponse.json({ error: "Read error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dbPath = path.resolve(process.cwd(), "db.json");
    
    // 1. Read current data
    const fileData = await fs.readFile(dbPath, "utf-8");
    const data = JSON.parse(fileData);

    // 2. Create new user
    const newUser = { 
      id: Date.now(), 
      ...body 
    };

    // 3. Update the array
    if (!data.users) data.users = [];
    data.users.push(newUser);

    // 4. Save back to the physical file
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Save error" }, { status: 500 });
  }
}