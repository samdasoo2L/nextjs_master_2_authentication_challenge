"use client";

import { useFormState } from "react-dom";
import Button from "../components/button";
import Input from "../components/input";
import { handleForm } from "./action";

export default function Login() {
  // 에러를 전달하기 위한 useFormState
  // 근데 action도 useFormState로 처리해야됨 그래야 에러를 받아올 수 있음
  // state가 action의 return value이다.
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="flex flex-col justify-center items-center mt-24 gap-10 w-full">
      <div className="text-5xl">⭐</div>
      <form
        action={action}
        className="flex flex-col justify-center min-w-72 w-1/3  gap-4"
      >
        <Input
          name="email"
          pic="📧"
          placeholder="Email"
          errors={state?.error?.fieldErrors.email}
          type="email"
          required
        />
        <Input
          name="username"
          pic="😀"
          placeholder="Username"
          errors={state?.error?.fieldErrors.username}
          type="text"
          required
        />
        <Input
          name="password"
          pic="🤐"
          placeholder="Password"
          type="password"
          errors={state?.error?.fieldErrors.password}
          required
        />
        <Button />
        {state?.success && (
          <div className="w-full p-3 bg-green-400 rounded-xl">
            ✅ Welcome back!
          </div>
        )}
      </form>
    </div>
  );
}
