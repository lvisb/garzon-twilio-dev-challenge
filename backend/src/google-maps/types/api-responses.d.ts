declare namespace ApiResponses {
  namespace GoogleMaps {
    interface Json {
      results: Array<{
        address_components: Array<{
          long_name: string
          short_name: string
          types: Array<string>
        }>
        entrances: Array<any>
        formatted_address: string
        geometry: {
          bounds: {
            northeast: {
              lat: number
              lng: number
            }
            southwest: {
              lat: number
              lng: number
            }
          }
          location: {
            lat: number
            lng: number
          }
          location_type: string
          viewport: {
            northeast: {
              lat: number
              lng: number
            }
            southwest: {
              lat: number
              lng: number
            }
          }
        }
        place_id: string
        types: Array<string>
      }>
      status: string
    }
  }
}
