declare namespace ApiResponses {
  namespace Nylas {
    interface Error {
      error: string
      error_code: number
      error_description: string
      error_uri: string
      request_id: string
    }

    namespace Connect {
      namespace Token {
        interface Json {
          access_token: string
          token_type: string
          id_token: string
          grant_id: string
        }
      }
    }
  }
}
