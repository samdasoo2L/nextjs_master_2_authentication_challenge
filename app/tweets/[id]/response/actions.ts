"use server";

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  response: z
    .string({
      invalid_type_error: "Username must be a string!",
      required_error: "Where is my username??",
    })
    .min(5, { message: "more longer" }),
  tweetId: z.coerce.number(),
});

export async function createResponse(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.id) {
    redirect("/log-in");
  }
  const data = {
    response: formData.get("response"),
    tweetId: formData.get("tweetId"),
  };
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    await db.response.create({
      data: {
        response: result.data.response,
        userId: session.id!,
        tweetId: result.data.tweetId,
      },
    });
    redirect(`/tweets/${result.data.tweetId}`);
  }
}
