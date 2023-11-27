import { FC, useMemo } from "react";
import { DailyForecast } from "@/app/types/types";
import Image from "next/image";

type Props = {
  forecastData?: DailyForecast[];
};

const WeatherForecastTable: FC<Props> = ({ forecastData }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        5-Day Weather Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {forecastData?.map(({ dt, main, weather }) => (
          <div key={dt} className="border p-2 text-center rounded-xl">
            <p className="mb-2">
              {new Date(dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <p className="mb-2">{main.temp} °C</p>
            <Image
              src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
              width={50}
              height={50}
              alt="Weather Icon"
              className="w-16 h-16 mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastTable;
