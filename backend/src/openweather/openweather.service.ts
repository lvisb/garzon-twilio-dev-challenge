import { EnvService } from '#env/env.service.js'
import { Injectable } from '@nestjs/common'
import axios, { Axios } from 'axios'

@Injectable()
export class OpenWeatherService {
  private axios: Axios

  constructor(private readonly envService: EnvService) {
    this.axios = axios.create({
      baseURL: this.envService.getValue('OPEN_WEATHER_API_URI'),
      params: {
        appid: this.envService.getValue('OPEN_WEATHER_API_KEY'),
      },
    })
  }

  dailyWeather(latitude: number, longitude: number) {
    return this.axios.get<ApiResponses.OpenWeather.Json>(`/onecall`, {
      params: {
        lat: latitude,
        lon: longitude,
        exclude: 'current,minutely,hourly,alerts',
      },
    })
  }
}
