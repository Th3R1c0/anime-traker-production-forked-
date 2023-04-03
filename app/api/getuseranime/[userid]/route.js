import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function GET(request, { params }) {
  const userid = params.userid;
  const a = `  const updatedUser = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      Anime: {
        create: [
          {
            title: "Demon Slayer",
            malID: 39814,
            episodes: 5,
          },
          {
            title: "Jujutsu Kaisen",
            malID: 40748,
            episodes: 5,
          },
          {
            title: "My Hero Academia",
            malID: 31964,
            episodes: 5,
          },
        ],
      },
    },
  });`;

  const res = await prisma.User.findUnique({
    where: {
      id: 1,
    },
    include: {
      Anime: true,
    },
  });

  console.log(res);
  return NextResponse.json(res.Anime);
}
