"use client";

import { useFormStatus } from "react-dom";

export default function Button() {
  // form 처리 중일때 멈추게 해주는 용도 useFormStatus
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-neutral-100 rounded-full font-semibold p-3 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Loading..." : "Log in"}
    </button>
  );
}
