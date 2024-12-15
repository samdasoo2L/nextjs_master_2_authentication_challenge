"use server";

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
      })
      .trim()
      .toLowerCase()
      .optional(),
    bio: z.string().optional(),
    email: z.string().email().toLowerCase().optional(),
    password: z.string().min(5).optional(),
    confirm_password: z.string().min(5).optional(),
  })
  .superRefine(async ({ username }, ctx) => {
    if (username) {
      const user = await db.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (user) {
        ctx.addIssue({
          code: "custom",
          message: "This username is already taken",
          path: ["username"],
          fatal: true,
        });
        return z.NEVER;
      }
    }
  })
  .superRefine(async ({ email }, ctx) => {
    if (email) {
      const user = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (user) {
        ctx.addIssue({
          code: "custom",
          message: "This email is already taken",
          path: ["email"],
          fatal: true,
        });
        return z.NEVER;
      }
    }
  })
  .refine(
    (data) => {
      const { password, confirm_password } = data;
      // password와 confirm_password가 모두 제공되었을 경우만 비교
      if (password && confirm_password) {
        return password === confirm_password;
      }
      return true; // 둘 중 하나라도 없으면 검증을 통과
    },
    {
      message: "Both passwords should be equal",
      path: ["confirm_password"],
    }
  );

export async function editProfile(prevState: any, formData: FormData) {
  const session = await getSession();
  const id = formData.get("id");
  if (session.id !== Number(id)) {
    redirect("/");
  }
  const data: any = {};
  if (formData.get("username")) {
    data.username = formData.get("username");
  }
  if (formData.get("bio")) {
    data.bio = formData.get("bio");
  }
  if (formData.get("email")) {
    data.email = formData.get("email");
  }
  if (formData.get("password")) {
    data.password = formData.get("password");
  }
  if (formData.get("confirm_password")) {
    data.confirm_password = formData.get("confirm_password");
  }
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    if (result.data.password) {
      const hashedPassword = await bcrypt.hash(result.data.password, 12);
      result.data.password = hashedPassword;
    }
    await db.user.update({
      where: { id: session.id },
      data: result.data,
    });
    redirect("/profile");
  }
}
