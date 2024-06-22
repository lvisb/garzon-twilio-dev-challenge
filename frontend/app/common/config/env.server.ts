export type EnvServer = {
  NODE_ENV: string
  NYLAS_CLIENT_ID: string
  NYLAS_REDIRECT_URI: string
  WEBSITE_API_BASE_URL: string
  JWT_SECRET: string
}

export type EnvClient = {
  NYLAS_CLIENT_ID: string
}

let _env: EnvServer

export const envServer = (): EnvServer => {
  if (!_env) {
    _env = {
      NODE_ENV: process.env.NODE_ENV,

      NYLAS_CLIENT_ID: process.env.NYLAS_CLIENT_ID!,

      NYLAS_REDIRECT_URI: process.env.NYLAS_REDIRECT_URI!,

      WEBSITE_API_BASE_URL: process.env.WEBSITE_API_BASE_URL!,

      JWT_SECRET: process.env.JWT_SECRET!,
    }
  }
  return _env
}
