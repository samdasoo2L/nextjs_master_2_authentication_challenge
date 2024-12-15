import { notFound, redirect } from "next/navigation";
import getSession from "../../lib/session";
import db from "../../lib/db";
import Link from "next/link";
import Button from "@/app/components/button";
import GoButton from "@/app/components/go-button";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col">
      <GoButton url={"/"} text={"Home"} />
      <div className="text-xl mb-7">
        <div>Username : {user?.username}</div>
        <div>Email : {user?.email}</div>
        <div>bio : {user?.bio ?? "🤐"}</div>
      </div>
      <div className="flex gap-2">
        <form action={logOut}>
          <Button text="Log out" />
        </form>
        <Link href={`users/${user.id}/edit`}>
          <Button text={"edit profile"} />
        </Link>
      </div>
    </div>
  );
}
