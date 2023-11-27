import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/api/queries";
import { api } from "@/app/api";
import { Cords, WeatherApiResponse } from "@/app/types/types";
import { useGetMapEveryNthElement } from "@/app/mappers/useGetMapEveryNthElement";

export const useDailyWeather = (cords?: Cords) => {
  const { data, isLoading, refetch } = useQuery<WeatherApiResponse>({
    queryKey: [QUERY_KEYS.WEATHER, cords],
    queryFn: () => getDailyWeatherData(cords),
    staleTime: 5 * 60 * 1000,
  });

  return { data: useGetMapEveryNthElement(data?.list, 8), isLoading, refetch };
};

const getDailyWeatherData = async (cords?: Cords) => {
  try {
    if (cords) {
      const { lat, lon } = cords;
      return await api({
        url: `forecast?lat=${lat}&lon=${lon}`,
        additionalParam: "&units=metric",
      });
    }
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    throw error;
  }
};
