import Link from "next/link";
import db from "../lib/db";
import TweetList from "../components/tweet-list";
import { Prisma } from "@prisma/client";

async function getInitialTweet() {
  const tweet = await db.tweet.findMany({
    select: {
      tweet: true,
      updated_at: true,
      created_at: true,
      user: true,
      id: true,
    },
    // 하나만 가져올거에요
    take: 1,
    // 역순으로 가져올거에요
    orderBy: {
      // 생성 날짜 기준으로요
      created_at: "desc",
    },
  });
  return tweet;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweet>;

export default async function Home() {
  const initialTweet = await getInitialTweet();
  return (
    <div>
      <Link href={`/tweets/add`}>+</Link>
      <Link href={`/create-account`}>Join</Link>
      <Link href={`/log-in`}>Login</Link>
      <TweetList initialTweets={initialTweet} />
    </div>
  );
}
