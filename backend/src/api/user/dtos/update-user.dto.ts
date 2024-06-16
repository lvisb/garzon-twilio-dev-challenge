import { FilterXSS } from '#common/transformers/filter-xss.transform.js'
import { invalidField } from '#i18n/i18n.config.js'
import { Expose, Type } from 'class-transformer'
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'

export class UpdateUserDto {
  @Expose()
  @FilterXSS()
  @IsNotEmpty({ message: invalidField })
  @IsOptional()
  name: string

  @Expose()
  @IsBoolean({ message: invalidField })
  @Type(() => Boolean)
  horoscope: boolean

  @Expose()
  @IsBoolean({ message: invalidField })
  @Type(() => Boolean)
  weather: boolean

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
  @IsBoolean({ message: invalidField })
  @Type(() => Boolean)
  motivationalQuotes: boolean
}
