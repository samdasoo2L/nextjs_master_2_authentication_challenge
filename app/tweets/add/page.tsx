"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useFormState } from "react-dom";
import uploadTweet from "./actions";
import Link from "next/link";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div>
      <Link
        className="my-6 text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600"
        href={`/`}
      >
        Home
      </Link>
      <form className="mt-6 flex flex-col gap-1" action={action}>
        <Input
          name={"tweet"}
          pic={"🗨️"}
          placeholder="Talk to me!"
          required
        ></Input>
        <Button text={"🗨️Talk!!"}></Button>
      </form>
    </div>
  );
}
