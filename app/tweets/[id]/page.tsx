import { notFound, redirect } from "next/navigation";
import LikeButton from "@/app/components/like-button";
import Input from "@/app/components/input";
import { getIsLiked, getIsOwner, getResponse, getTweet } from "./actions";
import Link from "next/link";
import getSession from "@/app/lib/session";
import { formatToTimeAgo } from "@/app/lib/utils";

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const isOwner = await getIsOwner(tweet.userId);
  const responses = await getResponse(id);
  const isLiked = await getIsLiked(id);
  const session = await getSession();
  return (
    <div>
      <Link
        className="my-6 text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600"
        href={"/"}
      >
        Home
      </Link>
      <div className="flex flex-col mt-10 mb-3">
        <h1 className="text-2xl font-semibold">{tweet.tweet}</h1>
        <p>{formatToTimeAgo(tweet.created_at.toString())}</p>
      </div>
      <LikeButton
        isLiked={isLiked}
        likeCount={tweet._count.Like}
        tweetId={id}
      />
      {session.id ? (
        <Link
          className={`flex items-center justify-center gap-2 text-neutral-400 text-base border border-neutral-400 rounded-xl p-2  transition-colors mb-6 hover:bg-sky-600 hover:text-white hover:font-extrabold`}
          href={`/tweets/${id}/response`}
        >
          댓글쓰기
        </Link>
      ) : null}
      {responses.map((res, index) => (
        <div
          key={index}
          className="border-2 border-sky-600 rounded-lg p-2 mb-2"
        >
          <div>🗨️ {res.response}</div>
          <div>
            😀{" "}
            {res.user.username == tweet.user.username
              ? "나!"
              : res.user.username}
          </div>
        </div>
      ))}
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        {isOwner ? (
          <button className="bg-sky-500 px-5 py-2.5 rounded-md text-white font-semibold">
            oner
          </button>
        ) : null}
      </div>
    </div>
  );
}
