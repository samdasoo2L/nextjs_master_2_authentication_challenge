import Link from "next/link";
import db from "../lib/db";
import TweetList from "../components/tweet-list";
import { Prisma } from "@prisma/client";
import getSession from "../lib/session";
import { redirect } from "next/navigation";

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
    take: 3,
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
  const session = await getSession();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <div className="w-auto text-center my-6 text-4xl text-sky-600">
        Talk&Talk
      </div>
      {session.id ? (
        <div className="gap-1 flex flex-col">
          <Link
            className="text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600"
            href={`/profile`}
          >
            Profile
          </Link>
          <div className="text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600">
            <form action={logOut}>
              <button>Log out</button>
            </form>
          </div>
          <Link
            className="h-10 w-28 bg-sky-800  rounded-lg flex justify-center items-center text-white hover:text-sky-800 hover:bg-sky-200 font-bold"
            href={`/tweets/add`}
          >
            MAKE TALK
          </Link>
        </div>
      ) : (
        <div className="gap-1 flex flex-col">
          <Link
            className="text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 animate-pulse bg-sky-600"
            href={`/create-account`}
          >
            Join
          </Link>
          <Link
            className="text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600"
            href={`/log-in`}
          >
            Login
          </Link>
        </div>
      )}
      <div className="flex gap-1">
        <div className="border  border-sky-500 hover:bg-sky-200 w-20 h-8 flex justify-center items-center text-sky-800 rounded-lg my-1 ">
          <Link href={"/search"}>🔍Tweet</Link>
        </div>
        <div className="border border-sky-500 hover:bg-sky-200 w-20 h-8 flex justify-center items-center text-sky-800 rounded-lg my-1 ">
          <Link href={"/users"}>🔍User</Link>
        </div>
      </div>
      <div className="w-full mt-6 rounded-lg border border-sky-800">
        <TweetList initialTweets={initialTweet} />
      </div>
    </div>
  );
}
