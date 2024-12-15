import Link from "next/link";

export default function GoButton({ url, text }: { url: string; text: string }) {
  return (
    <Link
      className="my-6 text-center flex justify-center items-center rounded-lg text-white h-8 w-20 hover:bg-sky-200 hover:text-sky-800 bg-sky-600"
      href={url}
    >
      {text}
    </Link>
  );
}
