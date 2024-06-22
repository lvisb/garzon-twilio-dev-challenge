type UnknownErrorJsonProperties = Required<
  Pick<ApiResponses.JsonResponse, 'message' | 'status' | 'statusCode'>
>

export const UNKNOWN_ERROR_JSON: UnknownErrorJsonProperties = {
  status: 'error',
  message: 'An unknown error occurred.\nPlease try again.',
  statusCode: 500,
} as const
