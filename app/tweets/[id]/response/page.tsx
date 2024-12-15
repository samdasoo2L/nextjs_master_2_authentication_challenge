"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { notFound } from "next/navigation";
import { useFormState } from "react-dom";
import { createResponse } from "./actions";
import Link from "next/link";

export default function CreateResponse({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const [state, dispatch] = useFormState(createResponse, null);
  return (
    <div>
      <Link
        className="my-6 text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600"
        href={`/tweets/${id}`}
      >
        Back
      </Link>
      <form className="mt-6 flex flex-col gap-1" action={dispatch}>
        <Input
          name="response"
          pic="🤔"
          type="text"
          placeholder="response"
          required
          errors={state?.fieldErrors.response}
        />
        <Input name="tweetId" pic="" hidden value={id} />
        <Button text={"댓글쓰기"} />
      </form>
    </div>
  );
}
