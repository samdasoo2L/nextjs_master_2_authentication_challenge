"use client";

import { useFormState } from "react-dom";
import Input from "../components/input";
import { searchTweet } from "./actions";
import ListTweet from "../components/list-tweet";
import Link from "next/link";
import GoButton from "../components/go-button";

export default function Search() {
  const [state, action] = useFormState(searchTweet, null);
  return (
    <div>
      <GoButton url={"/"} text={"Home"} />
      <div className="text-center text-3xl mb-6">Search Talk</div>
      <form action={action}>
        <Input
          name="search"
          pic="🔍"
          placeholder="search?"
          type="text"
          errors={state?.errors}
        />
      </form>
      <div className="h-6"></div>
      {state?.tweets
        ? state!.tweets.map((tweet) => <ListTweet key={tweet.id} {...tweet} />)
        : null}
    </div>
  );
}
