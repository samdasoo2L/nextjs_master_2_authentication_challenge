import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={`/create-account`}>Join</Link>
      <Link href={`/log-in`}>Login</Link>
    </div>
  );
}
