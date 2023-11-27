"use client";
import { useWeatherByCity } from "@/app/api/queries/weather/useWeatherByCity";
import { useParams } from "next/navigation";
import Spinner from "@/app/components/ui/Spinner/Spinner";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { Arrow } from "@/app/components/ui/Arrow/Arrow";
import { useCopyToClipboard } from "usehooks-ts";
import { CopyIcon } from "@/app/components/ui/CopyIcon/CopyIcon";
import { toast } from "react-hot-toast";
import { useDailyWeather } from "@/app/api/queries/weather/useDailyWeather";
import WeatherForecastTable from "@/app/components/WeatherForecastTable/WeatherForecastTable";

export default function Page() {
  const { slug } = useParams();
  const { data, isLoading } = useWeatherByCity((slug as string).toLowerCase());
  const weatherDescription = useMemo(
    () => (data?.weather ? data.weather[0]?.description : ""),
    [data?.weather],
  );
  const [, copy] = useCopyToClipboard();

  const { data: dataDailyWeather, isLoading: isDailyWeatherLoading } =
    useDailyWeather(data?.coord);

  const weatherIcon = useMemo(
    () => `https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`,
    [data?.weather],
  );

  const formatTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const handleCopy = useCallback(async () => {
    await copy(window.location.href);
    toast.success("Link successfully copied!");
  }, []);

  return (
    <div className="flex justify-center flex-col items-center py-4 min-h-screen lg:h-screen bg-gradient-to-b from-blue-500 to-purple-800 text-white">
      {isLoading ? (
        <Spinner />
      ) : data && data.name ? (
        <>
          <div className="text-center border border-white p-8 rounded-lg relative min-w-[300px] m-8">
            <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
            <div className="mb-4 flex flex-col justify-center items-center">
              <Image
                src={weatherIcon}
                width={50}
                height={50}
                alt="Weather Icon"
                className="w-16 h-16"
              />
              <p>{weatherDescription}</p>
            </div>
            <div className="mb-4">
              <p>Temperature: {data.main.temp} °C</p>
              <p>Pressure: {data.main.pressure} hPa</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind Speed: {data.wind.speed} m/s</p>
            </div>
            <div>
              <p>Sunrise: {formatTime(data.sys.sunrise)}</p>
              <p>Sunset: {formatTime(data.sys.sunset)}</p>
            </div>
            <Arrow path={"/"} />
            <div
              className={"absolute right-2 top-2 cursor-pointer"}
              onClick={handleCopy}
            >
              <CopyIcon />
            </div>
          </div>
          {!isDailyWeatherLoading ? (
            <WeatherForecastTable forecastData={dataDailyWeather} />
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <>
          <div className={"text-xl"}>City not found!</div>
          <Arrow path={"/"} />
        </>
      )}
    </div>
  );
}
