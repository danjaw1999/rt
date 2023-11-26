import { create } from 'zustand'
import {
  deleteLocalStorageItem,
  getLocalStorage,
  setLocalStorage,
} from '@/app/store/localStorage'
import { toast } from 'react-hot-toast'

interface WeatherStore {
  cities?: string[]
  addCity: (city: string) => void
  removeAllCities: () => void
}

const localData = getLocalStorage<string[] | undefined>('cities')
export const useCityStore = create<WeatherStore>(set => ({
  cities: localData ?? [],
  addCity: city =>
    set(state => {
      if (city?.length > 2) {
        if (!state.cities) {
          setLocalStorage('cities', [city])
          return { cities: [city] }
        }
        if (
          !state.cities
            .map(city => city.toLowerCase())
            ?.includes(city.toLowerCase())
        ) {
          const newCities = [...state.cities, city]
          toast.success(` ${city} successfully added!`)
          setLocalStorage('cities', newCities)
          return { cities: newCities }
        } else {
          toast.error('This city is already added.')
        }
      }
      return state
    }),
  removeAllCities: () =>
    set(() => {
      deleteLocalStorageItem('cities')
      toast.success('Successfully cities removed!')
      return { cities: [] }
    }),
}))
