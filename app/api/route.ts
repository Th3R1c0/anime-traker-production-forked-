import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
export async function GET() {
  const res = await prisma.User.findMany();
  return NextResponse.json(res[0].email);
}
