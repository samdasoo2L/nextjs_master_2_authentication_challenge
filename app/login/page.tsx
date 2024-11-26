"use client";

import { useFormState } from "react-dom";
import FormBtn from "../components/form-btn";
import FormInput from "../components/form-input";
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
        <FormInput
          name="email"
          pic="📧"
          placeholder="Email"
          errors=""
          type="email"
          required={true}
        />
        <FormInput
          name="username"
          pic="😀"
          placeholder="Username"
          errors=""
          type="text"
          required={true}
        />
        <FormInput
          name="password"
          pic="🤐"
          placeholder="Password"
          type="password"
          errors={state?.errors ?? ""}
          required={true}
        />
        <FormBtn />
        {state?.success && (
          <div className="w-full p-3 bg-green-400 rounded-xl">
            ✅ Welcome back!
          </div>
        )}
      </form>
    </div>
  );
}
