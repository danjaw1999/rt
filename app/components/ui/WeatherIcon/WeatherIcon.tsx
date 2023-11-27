import Image from "next/image";
import { FC } from "react";

type Props = {
  slug: string;
  width?: number;
  height?: number;
};

export const WeatherIcon: FC<Props> = ({ slug, width = 50, height = 50 }) => {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${slug}.png`}
      width={width}
      height={height}
      alt="Weather Icon"
      className="w-16 h-16 mx-auto"
    />
  );
};
