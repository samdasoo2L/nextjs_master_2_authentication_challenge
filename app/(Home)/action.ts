"use server";

import db from "@/app/lib/db";

// import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      updated_at: true,
      created_at: true,
      user: true,
      id: true,
    },
    skip: page * 3,
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
