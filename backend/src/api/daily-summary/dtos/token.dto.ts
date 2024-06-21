import { Expose } from "class-transformer";

export class AdminTokenDto {
  @Expose()
  sub: string
}
