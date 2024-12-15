"use client";

import { useState } from "react";
import { InitialTweets } from "../(Home)/page";
import { getMoreTweets } from "../(Home)/action";
import ListTweet from "./list-tweet";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page + 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      setTweets((prev) => [...prev, ...newTweets]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="py-4 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      {isLastPage ? (
        <div className="text-center">No more items 🙄</div>
      ) : (
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className="text-sm  font-semibold bg-sky-400 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-80 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </button>
      )}
    </div>
  );
}
