import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await fetch(`http://server:3000/accounts/${id}`, {
    next: {
      revalidate: 1,
    },
  });
  return NextResponse.json(await response.json());
}