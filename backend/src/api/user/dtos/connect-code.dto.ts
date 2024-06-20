import { Expose } from 'class-transformer'
import { IsDefined } from 'class-validator'

export class ConnectCodeDto {
  @Expose()
  @IsDefined()
  code: string
}
