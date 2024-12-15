import { notFound, redirect } from "next/navigation";
import getSession from "../../lib/session";
import db from "../../lib/db";
import Link from "next/link";
import ListTweet from "@/app/components/list-tweet";
import Button from "@/app/components/button";
import GoButton from "@/app/components/go-button";

async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      Tweet: true,
    },
  });
  if (user) {
    return user;
  } else {
    notFound();
  }
}

export default async function Profile({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const user = await getUser(id);
  const session = await getSession();
  console.log(session);
  return (
    <div>
      <GoButton url={"/users"} text={"Back"} />
      <div className="text-xl mb-8">
        <div>Username : {user?.username}</div>
        <div>Email : {user?.email}</div>
        <div>Bio : {user?.bio ?? "🤐"}</div>
      </div>
      {user.Tweet.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} user={id} />
      ))}
      <div className="my-6">
        {session.id == id ? (
          <Link href={`/users/${id}/edit`}>
            <Button text={"Edit profile"} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
