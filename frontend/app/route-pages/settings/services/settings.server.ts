import { envServer } from '~/common/config/env.server'
import { APIServer, APIServerConfig } from '~/services/api.server'

export class SettingsApiServer extends APIServer {
  constructor({ token }: APIServerConfig) {
    super({
      baseURL: `${envServer().WEBSITE_API_BASE_URL}/api`,
      token,
    })
  }

  loadUser() {
    return this.request.get(`/user`)
  }
}
