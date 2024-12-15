import Link from "next/link";
import db from "../lib/db";
import GoButton from "../components/go-button";

const getUsers = async () => {
  "use server";
  return await db.user.findMany();
};

export default async function Users() {
  const users = await getUsers();
  return (
    <div>
      <GoButton url={"/"} text={"Home"} />
      <div className="flex flex-col gap-5">
        <div className="text-center text-3xl mb-2">Users</div>
        {users.map((user) => (
          <div key={user.id}>
            <Link
              className="text-xl rounded-lg flex bg-sky-200 pl-2 py-4 w-40"
              href={`/users/${user.id}`}
            >
              😀 {user.username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
