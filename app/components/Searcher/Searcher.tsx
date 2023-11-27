"use client";
import { useCallback, useEffect, useState } from "react";
import Search from "@/app/components/ui/Search/Search";
import { useCityStore } from "@/app/store/cities";
import { Button } from "@/app/components/ui/Button/Button";
import { useCurrentLocation } from "@/app/hooks/useGeoLocation";
import { useWeatherByGeo } from "@/app/api/queries/weather/useWeatherByGeo";
import { useWeatherByCity } from "@/app/api/queries/weather/useWeatherByCity";
import { toast } from "react-hot-toast";
import { CityInfo } from "@/app/types/types";
import { useKey } from "react-use";

export const Searcher = () => {
  const [city, setCity] = useState("");
  const { addCity } = useCityStore();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const { location, hasPermission } = useCurrentLocation();
  const [cityInfo, setCityInfo] = useState<CityInfo | undefined>(undefined);
  const { data: dataByGeo } = useWeatherByGeo(
    location.latitude,
    location.longitude,
  );

  const {
    data: dataByCity,
    isLoading,
    refetch,
  } = useWeatherByCity(city, city.length > 2 && isButtonClicked);

  const handleClickGeo = useCallback(() => {
    addCity(dataByGeo?.name);
  }, [dataByGeo]);

  useEffect(() => {
    setCityInfo(dataByCity);

    if (dataByCity?.cod && dataByCity?.message) {
      toast.error(dataByCity.message.toLocaleUpperCase());
      setButtonClicked(false);
    }
  }, [dataByCity]);

  useEffect(() => {
    if (city.length > 2 && cityInfo?.name && isButtonClicked) {
      addCity(city);
      setCity("");
      setButtonClicked(false);
    }
  }, [cityInfo, isButtonClicked, city]);

  const handleClick = useCallback(async () => {
    setButtonClicked(true);
    await refetch();
  }, []);

  useKey("Enter", city.length > 2 ? handleClick : undefined);

  return (
    <div className={"flex flex-col align-center"}>
      <div
        className={
          "flex flex-col md:flex-row gap-3 justify-center items-center"
        }
      >
        <Search city={city} setCity={setCity} />
        <Button onClick={handleClick} disabled={isLoading || city.length < 2}>
          Add
        </Button>
      </div>
      <div className={"w-full flex justify-center mt-8 align-center"}>
        <Button onClick={handleClickGeo} disabled={!hasPermission}>
          Add by current location
        </Button>
      </div>
    </div>
  );
};
