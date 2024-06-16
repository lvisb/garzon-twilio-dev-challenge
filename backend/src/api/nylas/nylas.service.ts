import { EnvService } from '#env/env.service.js'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import axios, { Axios } from 'axios'
import { IdTokenDto } from './dto/id-token.dto.js'
import { endOfDay, getUnixTime, startOfDay } from 'date-fns'

@Injectable()
export class NylasService {
  private axios: Axios

  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
  ) {
    this.axios = axios.create({
      baseURL: this.envService.getValue('NYLAS_API_URI') + '/v3',
      headers: {
        Authorization: `Bearer ${this.envService.getValue('NYLAS_API_KEY')}`,
      },
    })
  }

  token(code: string) {
    return axios.post<ApiResponses.Nylas.Connect.Token.Json>(
      `/connect/token`,
      {
        client_id: this.envService.getValue('NYLAS_CLIENT_ID'),
        client_secret: this.envService.getValue('NYLAS_API_KEY'),
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:8001',
      },
      {
        headers: null,
      },
    )
  }

  extractTokenInfo(idToken: string) {
    return this.jwtService.decode<IdTokenDto>(idToken)
  }

  calendars(grantId: string) {
    return this.axios.get<ApiResponses.Nylas.Calendars.Json>(
      `/grants/${grantId}/calendars`,
    )
  }

  calendarEvents(calendarId: string, grantId: string) {
    return this.axios.get<ApiResponses.Nylas.Events.Json>(
      `/grants/${grantId}/events`,
      {
        params: {
          calendar_id: calendarId,
          start: getUnixTime(startOfDay(new Date())),
          end: getUnixTime(endOfDay(new Date())),
        },
      },
    )
  }
}
