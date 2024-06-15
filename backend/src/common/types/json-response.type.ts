export namespace ApiResponses {
  export interface InputValidationError {
    field: string
    message: string
  }

  export interface JsonResponse {
    status?: 'ok' | 'error'
    id?: string
    statusCode?: number
    message?: string
    errors?: InputValidationError[]

    [key: string]: any
  }

  export interface JsonResponsePagination extends JsonResponse {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    totalPages: number
  }
}
