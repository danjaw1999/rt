import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";

type Props = {
  path: string;
};
export const Arrow: FC<Props> = ({ path }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(path ?? "/");
  }, [path]);
  return (
    <div className="absolute top-2 left-2">
      <div
        className="w-8 h-8 bg-white rounded-full flex justify-center items-center cursor-pointer -rotate-90"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>
    </div>
  );
};
