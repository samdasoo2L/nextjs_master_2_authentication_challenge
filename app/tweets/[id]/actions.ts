"use server";

import { z } from "zod";
import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { revalidatePath } from "next/cache";

export async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
        },
      },
    },
  });
  return tweet;
}

export async function getIsLiked(tweetId: number) {
  const session = await getSession();
  if (session.id) {
    const like = await db.like.findUnique({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    return Boolean(like);
  } else {
    return false;
  }
}

export async function getResponse(tweetId: number) {
  const response = await db.response.findMany({
    where: { tweetId },
    include: { user: { select: { username: true } } },
    orderBy: { created_at: "desc" },
  });
  return response;
}

export const likeTweet = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidatePath(`/tweets/${tweetId}`);
  } catch (e) {}
};

export const dislikeTweet = async (tweetId: number) => {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidatePath(`/post/${tweetId}`);
  } catch (e) {}
};
