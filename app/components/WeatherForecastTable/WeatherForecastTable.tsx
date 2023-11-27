import { FC } from "react";
import { DailyForecast } from "@/app/types/types";
import { WeatherIcon } from "@/app/components/ui/WeatherIcon/WeatherIcon";

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
          <div
            key={dt}
            data-testid={"day"}
            className="border p-2 text-center rounded-xl"
          >
            <p className="mb-2">
              {new Date(dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <p className="mb-2">{main.temp} °C</p>
            {weather[0].icon && <WeatherIcon slug={weather[0].icon} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastTable;
