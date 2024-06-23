import { envServer } from '~/common/config/env.server'
import { APIServer, APIServerConfig } from '~/services/api.server'
import { FormDto } from '../pages/index/dto/form.dto'

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

  updateUser(data: FormDto) {
    return this.request.patch(`/user`, data)
  }

  verifyCode(code: string, phone: string) {
    return this.request.patch(`/user/verify-code`, { code, phone })
  }
}
