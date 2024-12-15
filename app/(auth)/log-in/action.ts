"use server";
// 이건 서버에서만 실행되어야 하는 action이야! 를 의미

import { z } from "zod";
import db from "../../lib/db";
import bcrypt from "bcrypt";
import getSession from "../../lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required",
  }),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // 성공했네? 그럼 일단 준비물 가져오자
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    // 준비물 다 가져왔다. 최종 validation - 비번 맞아?
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "ZZ"
    );
    if (ok) {
      const session = await getSession();
      // 이제부터 넌(session받을 클라) user다!
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
}
