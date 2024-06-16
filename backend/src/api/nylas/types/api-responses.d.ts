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
          provider: string
        }
      }
    }

    namespace Calendars {
      interface Data {
        grant_id: string
        description: null | string
        id: string
        is_primary: boolean
        name: string
        object: string
        read_only: boolean
        timezone: string
        hex_color: string
        is_owned_by_user: boolean
      }

      interface Json {
        request_id: string
        data: Data[]
      }
    }

    namespace Events {
      interface Json {
        request_id: string
        data: EventItem[]
      }

      interface EventItem {
        busy: boolean
        calendar_id: string
        conferencing: Conferencing
        created_at: number
        creator: Creator
        description: null
        grant_id: string
        hide_participants: boolean
        html_link: string
        ical_uid: string
        id: string
        object: string
        organizer: Creator
        participants: Participant[]
        read_only: boolean
        reminders: Reminders
        status: string
        title: string
        updated_at: number
        when: When
      }

      interface Conferencing {
        details: Details
        provider: string
      }

      interface Details {
        meeting_code: string
        url: string
      }

      interface Creator {
        email: string
        name: string
      }

      interface Participant {
        email: string
        status: string
      }

      interface Reminders {
        overrides: null
        use_default: boolean
      }

      interface When {
        end_time: number
        end_timezone: string
        object: string
        start_time: number
        start_timezone: string
      }
    }
  }
}
