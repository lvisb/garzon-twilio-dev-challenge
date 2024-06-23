export namespace DailySummary {
  export interface Json {
    events: Events.Json
    weather: Weather.Json
    horoscope: Horoscope.Json
  }

  export namespace Events {
    export interface CalendarEvent {
      title: string

      startDate: string

      endDate: string
    }

    export interface Json {
      summary: string
      motivational_quote: string
      events: CalendarEvent[]
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

  export namespace SmsSummary {
    export interface Json {
      summary: string
    }
  }
}
