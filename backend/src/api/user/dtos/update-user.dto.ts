import { FilterXSS } from '#common/transformers/filter-xss.transform.js'
import { timezones } from '#common/utils/timezones.util.js'
import { invalidField } from '#i18n/i18n.config.js'
import { Expose, Type } from 'class-transformer'
import {
  IsBoolean,
  IsBooleanString,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator'
import { ZodiacSign } from '#common/utils/zodiac-signs.util.js'
import { OptionalPhoneNumber } from '../validators/optional-phone-number.validator.js'

const zodiacValues = Object.values(ZodiacSign)

export class UpdateUserDto {
  @Expose()
  @FilterXSS()
  @IsNotEmpty({ message: invalidField })
  @IsOptional()
  name: string

  @Expose()
  @FilterXSS()
  @IsOptional()
  address: string

  @Expose()
  @IsLatitude({ message: invalidField })
  @Type(() => Number)
  @IsOptional()
  latitude: number

  @Expose()
  @IsLongitude({ message: invalidField })
  @Type(() => Number)
  @IsOptional()
  longitude: number

  @Expose()
  @IsIn(timezones, { message: invalidField })
  timezone: string

  @Expose()
  @IsBoolean({ message: invalidField })
  @Type(() => Boolean)
  phoneActive: boolean

  @Expose()
  @OptionalPhoneNumber('phoneActive', { message: invalidField })
  phone: string

  @Expose()
  @IsIn(zodiacValues, { message: invalidField })
  @IsOptional()
  zodiacSign: string
}
