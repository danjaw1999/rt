export type CityInfo = {
  message: string
  coord: Cords
  weather: WeatherInfo[]
  base: string
  main: MainInfo
  visibility: number
  wind: WindInfo
  snow: SnowInfo
  clouds: CloudsInfo
  dt: number
  sys: SysInfo
  timezone: number
  id: number
  name: string
  cod: number
}

export type WeatherApiResponse = {
  cod: string
  message: number
  cnt: number
  list: DailyForecast[]
}

export type DailyForecast = {
  dt: number
  main: MainInfo & {
    temp_kf: number
  }
  weather: WeatherInfo[]
  clouds: CloudsInfo
  wind: WindInfo
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

export type Cords = {
  lon: number
  lat: number
}

type WeatherInfo = {
  id: number
  main: string
  description: string
  icon: string
}

type MainInfo = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

type WindInfo = {
  speed: number
  deg: number
  gust: number
}

type SnowInfo = {
  '1h': number
}

type CloudsInfo = {
  all: number
}

type SysInfo = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export type ApiParams = {
  url: string
  additionalParam?: string
}
