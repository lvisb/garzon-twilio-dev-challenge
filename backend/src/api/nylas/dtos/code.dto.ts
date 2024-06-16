import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class CodeDto {
  @Expose()
  @IsDefined()
  code: string
}
