import { invalidField } from '#i18n/i18n.config.js'
import { Expose } from 'class-transformer'
import {
  IsDefined,
  IsNumberString,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CodeDto {
  @Expose()
  @MaxLength(6, { message: invalidField })
  @MinLength(6, { message: invalidField })
  @IsNumberString({}, { message: invalidField })
  @IsDefined()
  code: string

  @Expose()
  @IsPhoneNumber()
  phone: string
}
