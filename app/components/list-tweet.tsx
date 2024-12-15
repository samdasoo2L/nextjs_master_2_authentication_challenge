import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  updated_at: Date;
  created_at: Date;
  user: any;
  id: number;
}
export default function ListProduct({
  tweet,
  updated_at,
  created_at,
  user,
  id,
}: ListTweetProps) {
  return (
    <div>
      <Link
        href={`/tweets/${id}`}
        className="rounded-lg flex gap-5 hover:bg-sky-200 mx-6 p-4 "
      >
        <div className="flex flex-col gap-1 *:text-black">
          <span className="text-xl">🗨️ {tweet}</span>
          <span className="text-lg text-neutral-500">😀 {user.username}</span>
        </div>
      </Link>
      <div className="mt-4 border-b-2 border-sky-950 border-opacity-5 w-full"></div>
    </div>
  );
}
