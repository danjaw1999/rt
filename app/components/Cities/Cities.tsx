'use client'
import { City } from '@/app/components/City/City'
import Spinner from '@/app/components/ui/Spinner/Spinner'
import { useCities } from '@/app/hooks/useCities'
import { Button } from '@/app/components/ui/Button/Button'
import { useCallback } from 'react'

export const Cities = () => {
  const { citiesArr, isLoading, removeAllCities } = useCities()
  const handleRemoveAll = useCallback(() => {
    removeAllCities()
  }, [])
  return !isLoading ? (
    <div className={'h-full flex flex-col w-full my-4 items-center'}>
      <div className={'flex gap-3 justify-center flex-wrap items-center'}>
        {citiesArr?.length ? (
          citiesArr.map((city, id) => <City key={city + id} name={city} />)
        ) : (
          <span>You {"don't"} added any cities yet</span>
        )}
      </div>
      {citiesArr?.length! > 0 && (
        <Button
          className={'mt-4 w-full max-w-[450px]'}
          onClick={handleRemoveAll}
        >
          Remove all
        </Button>
      )}
    </div>
  ) : (
    <div className={'flex justify-center items-center mt-8'}>
      <Spinner />
    </div>
  )
}
