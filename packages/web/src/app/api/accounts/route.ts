import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch('http://server:3000/accounts', {
    next: {
      revalidate: 60, // 60s,
      tags: ["accounts"], // revalidate cache on demand
    },
  });

  return NextResponse.json(await response.json());
}
// FIXME Mapping all fetch and apply this strategy: proxy
// methods GET and POST
