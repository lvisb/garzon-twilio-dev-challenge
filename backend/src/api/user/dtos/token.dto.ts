import { Expose } from "class-transformer";

export class TokenDto {
  @Expose()
  sub: string
}
