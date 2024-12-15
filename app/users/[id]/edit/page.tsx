"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { notFound } from "next/navigation";
import { useFormState } from "react-dom";
import { editProfile } from "./actions";
import GoButton from "@/app/components/go-button";

export default function EditProfile({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const [state, dispatch] = useFormState(editProfile, null);
  return (
    <div>
      <GoButton url={"/profile"} text={"Back"} />
      <div className="text-center text-lg mb-4">Edit Profile</div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <Input
          pic="😀"
          name="username"
          type="text"
          placeholder="username"
          errors={state?.fieldErrors.username}
        />
        <Input
          pic="🥰"
          name="bio"
          type="text"
          placeholder="Bio"
          errors={state?.fieldErrors.bio}
        />
        <Input
          pic="📧"
          name="email"
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <Input
          pic="🤐"
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <Input
          pic="🤐"
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          errors={state?.fieldErrors.confirm_password}
        />
        <Input
          pic=""
          name="id"
          type="text"
          placeholder="id"
          required
          value={id}
          hidden
        />
        <Button text="Edit" />
      </form>
    </div>
  );
}
