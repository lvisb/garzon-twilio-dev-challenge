import { Expose } from 'class-transformer'

export class CodeDto {
  @Expose()
  code: string = ''
}
