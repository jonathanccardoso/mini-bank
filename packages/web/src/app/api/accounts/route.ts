import { NextRequest, NextResponse } from "next/server";

// Proxy strategy
export async function GET(
  request: NextRequest,
) {
  const cpjCnpj = request.nextUrl.searchParams.get('cpjCnpj');
  let response;
  if (cpjCnpj) {
    response = await fetch(`http://server:3000/accounts?cpjCnpj=${cpjCnpj}`, {
      next: {
        revalidate: 1,
      },
    });
  } else {
    response = await fetch('http://server:3000/accounts', {
      next: {
        revalidate: 10, // 10s,
        tags: ["accounts"], // revalidate cache on demand
      },
    });
  }


  return NextResponse.json(await response.json());
}
