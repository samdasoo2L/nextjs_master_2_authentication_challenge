"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useFormState } from "react-dom";
import uploadTweet from "./actions";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div>
      <form action={action}>
        <Input name={"tweet"} pic={"🙂"} placeholder="hi!" required></Input>
        <Button text={"TWEET!"}></Button>
      </form>
    </div>
  );
}
