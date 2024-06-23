import { Expose } from 'class-transformer'
import { ToBoolean } from '~/common/utils/to-boolean.util'

export class FormDto {
  @Expose()
  name: string = ''

  @Expose()
  email: string = ''

  @Expose()
  address: string = ''

  @Expose()
  latitude: string = ''

  @Expose()
  longitude: string = ''

  @Expose()
  timezone: string = ''

  @Expose()
  zodiacSign: string = ''

  @Expose()
  phone: string = ''

  @Expose()
  @ToBoolean()
  phoneActive: boolean = false
}
