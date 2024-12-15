"use server";

import { z } from "zod";
import db from "../lib/db";

const checkExists = async (search: string) => {
  const tweet = await db.tweet.findMany({
    where: {
      tweet: { contains: search },
    },
  });
  console.log(tweet);
  console.log(tweet.length !== 0);
  return tweet.length !== 0;
};

const formSchema = z.object({
  search: z
    .string()
    .min(5, { message: "more" })
    .refine(checkExists, "not exist."),
});

export async function searchTweet(prevState: any, formData: FormData) {
  const data = {
    search: formData.get("search"),
  };
  const result = await formSchema.spa(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      errors: result.error.flatten().fieldErrors.search,
      tweets: null,
    };
  } else {
    const tweets = await db.tweet.findMany({
      where: { tweet: { contains: result.data.search } },
      include: { user: true },
    });
    return {
      tweets,
    };
  }
}
