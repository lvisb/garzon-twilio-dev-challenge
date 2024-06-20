declare namespace ApiResponses {
  namespace OpenWeather {
    interface DailyItem {
      dt: number
      sunrise: number
      sunset: number
      moonrise: number
      moonset: number
      moon_phase: number
      summary: string
      temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
      }
      feels_like: {
        day: number
        night: number
        eve: number
        morn: number
      }
      pressure: number
      humidity: number
      dew_point: number
      wind_speed: number
      wind_deg: number
      wind_gust: number
      weather: Array<{
        id: number
        main: string
        description: string
        icon: string
      }>
      clouds: number
      pop: number
      uvi: number
      rain?: number
    }

    interface Json {
      lat: number
      lon: number
      timezone: string
      timezone_offset: number
      daily: DailyItem[]
    }
  }
}
