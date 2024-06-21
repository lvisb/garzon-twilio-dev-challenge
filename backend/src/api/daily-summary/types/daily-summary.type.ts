export namespace DailySummary {
  export interface Json {
    events: Events.Json
    weather: Weather.Json
    horoscope: Horoscope.Json
  }

  export namespace Events {
    export interface Json {
      summary: string
      motivational_quote: string
    }
  }

  export namespace Weather {
    export interface Json {
      summary: string
      icon: string
    }
  }

  export namespace Horoscope {
    export interface Json {
      zodiacSign: string
      summary: string
    }
  }
}
