import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { LoaderFunctionArgs, json } from '@remix-run/node'
import axios, { AxiosError } from 'axios'
import { envServer } from '~/common/config/env.server'

export type APIServerConfig = {
  token?: string
  defaultEndpoint?: string
  baseURL?: string
  customHeaders?: Record<string, string>
}

export class APIServer {
  protected request: AxiosInstance
  protected defaultEndpoint?: string
  protected baseURL?: string
  protected customHeaders?: Record<string, string>

  constructor({
    baseURL = `${envServer().WEBSITE_API_BASE_URL}/api/v1`,
    defaultEndpoint,
    token,
    customHeaders,
  }: APIServerConfig) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: defaultEndpoint ? baseURL + defaultEndpoint : baseURL,
      headers: {
        ...customHeaders,
      },
    }

    if (token) axiosConfig.headers!.Authorization = `Bearer ${token}`

    this.request = axios.create(axiosConfig)
    this.baseURL = baseURL
    this.defaultEndpoint = defaultEndpoint
  }
}

export const responseLoader = async <T>(
  response: Promise<AxiosResponse<T>>,
  remixArgs: LoaderFunctionArgs,
  throwError = false,
): Promise<T> => {
  try {
    const r = await response

    return r.data
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) throw json(e, { status: 500 })

      const { data } = e.response as AxiosResponse<ApiResponses.JsonResponse>

      if (!throwError && (data.errors || data.message))
        return e.response.data as Promise<T>
      else if (throwError) {
        if (data.message)
          throw json(
            { ...data, status: 'error' },
            { status: +data.statusCode! || 500 },
          )

        throw json(data, { status: data.statusCode })
      }
    }

    throw json(e, { status: 500 })
  }
}
