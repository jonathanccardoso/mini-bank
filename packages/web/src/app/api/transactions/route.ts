import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await fetch('http://server:3000/transactions', {
    next: {
      revalidate: 10,
      tags: ["transactions"],
    },
  });

  return NextResponse.json(await response.json());
}
export async function POST(
  request: NextRequest,
) {
  const response = await fetch('http://server:3000/transactions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await request.json()),
  });
  revalidateTag("transactions");

  return NextResponse.json(await response.json());
}
