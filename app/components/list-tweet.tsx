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
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden"></div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">{user}</span>
        <span className="text-lg font-semibold">{created_at.toString()}</span>
      </div>
    </Link>
  );
}
