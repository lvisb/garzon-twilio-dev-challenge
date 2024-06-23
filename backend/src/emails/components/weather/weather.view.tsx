import { DailySummary } from '#api/daily-summary/types/daily-summary.type.js'
import { Column, Row, Section, Hr, Img } from '@react-email/components'

export type WeatherProps = {
  assetsUrl: string
  data: DailySummary.Weather.Json
}

export const Weather = ({ assetsUrl, data }: WeatherProps) => {
  if (!data) {
    return null
  }

  return (
    <Section>
      <Row>
        <Column height={32} />
      </Row>

      <Row>
        <Column>
          <Hr style={{ borderTop: '1px dotted #ccc' }} />
        </Column>
      </Row>

      <Row>
        <Column height={32} />
      </Row>

      <Row>
        <Column width={100} valign="middle">
          <Img
            src={`${assetsUrl}/weather/${data.icon}.png`}
            width={100}
            height={100}
            alt={`${data.icon} by Iconixar Lineal Color - flaticon.com`}
          />
        </Column>

        <Column width={36} />

        <Column valign="middle" style={{ fontSize: '16px', lineHeight: 1.5 }}>
          {data.summary}
        </Column>
      </Row>

      <Row>
        <Column height={32} />
      </Row>

      <Row>
        <Column>
          <Hr style={{ borderTop: '1px dotted #ccc' }} />
        </Column>
      </Row>

      <Row>
        <Column height={32} />
      </Row>
    </Section>
  )
}
