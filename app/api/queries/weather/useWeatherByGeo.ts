import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/app/api/queries'
import { api } from '@/app/api'

export const useWeatherByGeo = (lat: number, lon: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.WEATHER_GEO, { lat, lon }],
    queryFn: () => getWeatherCityData(lat, lon),
    staleTime: 5 * 60 * 1000,
    enabled: !!(lat && lon),
  })
}

export const getWeatherCityData = async (lat: number, lon: number) => {
  try {
    return await api({ url: `weather?lat=${lat}&lon=${lon}` })
  } catch (error) {
    console.error('An error occurred while fetching weather data:', error)
    throw error
  }
}
