import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/app/api/queries'
import { api } from '@/app/api'
import { CityInfo } from '@/app/types/types'

export const useWeatherByCity = (city: string, enabled?: boolean) => {
  const { data, isLoading, refetch } = useQuery<CityInfo>({
    queryKey: [QUERY_KEYS.WEATHER, city],
    queryFn: () => getWeatherCityData(city),
    staleTime: 5 * 60 * 1000,
    enabled: enabled && city.length > 2,
  })

  return { data, isLoading, refetch }
}

const getWeatherCityData = async (city: string) => {
  try {
    return await api({
      url: `weather?q=${city}`,
      additionalParam: '&units=metric',
    })
  } catch (error) {
    console.error('An error occurred while fetching weather data:', error)
    throw error
  }
}
