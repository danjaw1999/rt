import { FC, MouseEventHandler, ReactNode, ButtonHTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ children, onClick, ...rest }) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase shadow-md transition-all focus:opacity-[0.85] active:opacity-[0.85] ${
        rest.disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-pink-500 text-white shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/40"
      } ${rest.className}`}
      data-ripple-light="true"
    >
      {children}
    </button>
  );
};
