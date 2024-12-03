import { notFound, redirect } from "next/navigation";
import getSession from "../lib/session";
import db from "../lib/db";

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
    <div>
      <div>welcome! {user?.username}!</div>
      <div>Email : {user?.email}!</div>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
