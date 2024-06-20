import { EnvService } from '#env/env.service.js'
import { Injectable } from '@nestjs/common'
import axios, { Axios } from 'axios'

@Injectable()
export class GoogleMapsService {
  private axios: Axios

  constructor(private readonly envService: EnvService) {
    this.axios = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        key: this.envService.getValue('GOOGLE_MAPS_API_KEY'),
      },
    })
  }

  address(search: string) {
    return this.axios.get<ApiResponses.GoogleMaps.Json>(``, {
      params: {
        address: search,
      },
    })
  }
}
