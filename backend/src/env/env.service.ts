import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { Expose, Type } from 'class-transformer'
import { IsDefined, IsEmail, IsInt, Min } from 'class-validator'

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
  JWT_SECRET: string

  @Expose()
  @IsDefined()
  NODE_ENV: 'development' | 'production'

  @Expose()
  @IsDefined()
  NYLAS_CLIENT_ID: string

  @Expose()
  @IsDefined()
  NYLAS_API_KEY: string

  @Expose()
  @IsDefined()
  NYLAS_API_URI: string

  @Expose()
  @IsDefined()
  OPENAI_API_KEY: string

  @Expose()
  @IsDefined()
  SENDGRID_API_KEY: string

  @Expose()
  @IsEmail()
  @IsDefined()
  EMAIL_FROM: string

  @Expose()
  @IsDefined()
  EMAIL_FROM_NAME: string
}

@Injectable()
export class EnvService {
  constructor(private readonly service: NestConfigService) {}

  getValue<T>(key: keyof Env) {
    return this.service.get<T>(key)
  }
}
