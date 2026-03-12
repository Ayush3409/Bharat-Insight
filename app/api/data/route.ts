import { NextRequest, NextResponse } from "next/server";

// Sample data generator - replace with actual data.gov.in data
function generateSampleData(dept: string, count: number = 1000) {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    if (dept === "health") {
      data.push({
        id: i + 1,
        state: ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat"][i % 5],
        year: 2020 + (i % 4),
        hospitals: Math.floor(Math.random() * 500) + 100,
        beds: Math.floor(Math.random() * 10000) + 1000,
        doctors: Math.floor(Math.random() * 5000) + 500,
      });
    } else if (dept === "agriculture") {
      data.push({
        id: i + 1,
        state: ["Punjab", "Haryana", "UP", "MP", "Bihar"][i % 5],
        year: 2020 + (i % 4),
        crop: ["Wheat", "Rice", "Cotton", "Sugarcane"][i % 4],
        production: Math.floor(Math.random() * 100000) + 10000,
        area: Math.floor(Math.random() * 50000) + 5000,
      });
    } else {
      data.push({
        id: i + 1,
        state: ["Kerala", "Goa", "Himachal", "Delhi", "Punjab"][i % 5],
        year: 2020 + (i % 4),
        schools: Math.floor(Math.random() * 1000) + 100,
        students: Math.floor(Math.random() * 100000) + 10000,
        teachers: Math.floor(Math.random() * 5000) + 500,
      });
    }
  }
  
  return data;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dept = searchParams.get("dept") || "health";
  
  // In production, fetch from data.gov.in or your database
  const data = generateSampleData(dept, 100000);
  
  return NextResponse.json(data);
}
