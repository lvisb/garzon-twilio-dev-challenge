import { EnvService } from '#env/env.service.js'
import { Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'

@Injectable()
export class NylasService {
  constructor(private readonly envService: EnvService) {}

  get apiUrl() {
    return this.envService.getValue('NYLAS_API_URI') + '/v3'
  }

  get apiConfig() {
    return {
      client_id: this.envService.getValue('NYLAS_CLIENT_ID'),
      client_secret: this.envService.getValue('NYLAS_API_KEY'),
    }
  }

  token(code: string) {
    return axios.post<ApiResponses.Nylas.Connect.Token.Json>(
      `${this.apiUrl}/connect/token`,
      {
        ...this.apiConfig,
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:8001',
      },
    )
  }
}
