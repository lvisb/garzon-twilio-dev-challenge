import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { Expose, Type } from 'class-transformer'
import { IsDefined, IsInt, Min } from 'class-validator'

export class Env {
  @Expose()
  @Type(() => Number)
  @IsInt()
  @Min(8000)
  BACKEND_PORT: number

  @Expose()
  @IsDefined()
  DATABASE_URL: string

  @Expose()
  @IsDefined()
  NODE_ENV: 'development' | 'production'
}

@Injectable()
export class EnvService {
  constructor(private readonly service: NestConfigService) {}

  getValue<T>(key: keyof Env) {
    return this.service.get<T>(key)
  }
}
