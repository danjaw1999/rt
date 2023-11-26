import { useEffect, useState } from "react";

const DEFAULT_LONGITUDE = 21.017532;
const DEFAULT_LATITUDE = 52.237049;

export const useCurrentLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation",
          });

          if (
            permissionStatus.state === "granted" ||
            permissionStatus.state === "prompt"
          ) {
            const { coords } = await getCurrentPosition();
            setLocation({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
            setHasPermission(true);
          } else if (permissionStatus.state === "denied") {
            console.error("Geolocation permission denied by the user.");
            setHasPermission(false);
          }
        } else {
          console.error("Geolocation is not supported by this browser.");
          setHasPermission(false);
        }
      } catch (error) {
        console.error("Error checking geolocation permission:", error);
        setHasPermission(false);
      }

      setIsLoading(false);
    };

    const getCurrentPosition = () => {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    getLocation();
  }, []);

  return { location, isLoading, hasPermission };
};
