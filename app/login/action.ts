"use server";
// 이건 서버에서만 실행되어야 하는 action이야! 를 의미

import { z } from "zod";

const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/);

const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(EMAIL_REGEX, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      PASSWORD_REGEX,
      "Password should contain at least one number (0123456789)."
    ),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten(),
    };
  } else {
    return {
      success: true,
      error: null,
    };
  }
}
