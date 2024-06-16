import { IRequestInfo } from '#common/types/request-info.type.js'
import { User } from '#db/entities/user.entity.js'

export interface SignedInRequest extends IRequestInfo {
  user: User
  token: string
}
