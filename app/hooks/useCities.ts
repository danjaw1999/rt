import { useEffect, useState } from 'react'
import { useCityStore } from '@/app/store/cities'

export const useCities = () => {
  const [citiesArr, setCitiesArr] = useState<string[] | undefined>([])
  const [isLoading, setIsLoading] = useState(true)
  const { cities, removeAllCities } = useCityStore()

  useEffect(() => {
    setIsLoading(false)
    setCitiesArr(cities)
  }, [cities])

  return {
    citiesArr,
    isLoading,
    removeAllCities,
  }
}
