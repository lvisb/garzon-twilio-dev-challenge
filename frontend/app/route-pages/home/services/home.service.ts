import { AxiosResponse } from 'axios'
import { envServer } from '~/common/config/env.server'
import { APIServer } from '~/services/api.server'
import { CodeDto } from '../dto/code.dto'

export class HomeApiServer extends APIServer {
  constructor() {
    console.log(envServer())
    super({
      baseURL: `${envServer().WEBSITE_API_BASE_URL}/api`,
    })
  }

  connect({ code }: CodeDto): Promise<AxiosResponse<any>> {
    return this.request.post('/user/connect', {
      code,
    })
  }
}
