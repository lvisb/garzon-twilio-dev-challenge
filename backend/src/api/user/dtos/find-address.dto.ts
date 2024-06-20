import { FilterXSS } from '#common/transformers/filter-xss.transform.js'
import { Expose } from 'class-transformer'
import { IsDefined } from 'class-validator'

export class FindAddressDto {
  @Expose()
  @FilterXSS()
  @IsDefined()
  address: string
}
