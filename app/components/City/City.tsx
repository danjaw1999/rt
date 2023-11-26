import { FC } from "react";
import Link from "next/link";

type Props = {
  name: string;
};

export const City: FC<Props> = ({ name }) => {
  return (
    <Link
      className="p-4 rounded-md bg-pink-500 text-white shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/40 transition duration-300 cursor-pointer"
      href={`/${name.toLowerCase()}`}
    >
      {name}
    </Link>
  );
};
