import { Expose } from "class-transformer";

export class IdTokenDto {
  @Expose()
  email: string

  // grant_id
  @Expose()
  sub: string

  @Expose()
  name?: string
}
