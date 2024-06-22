import { DailySummary } from '#api/daily-summary/types/daily-summary.type.js'
import { Column, Row, Section, Hr, Img, Text } from '@react-email/components'

export type ZodiacProps = {
  assetsUrl: string
  data: DailySummary.Horoscope.Json
}

export const Zodiac = ({ assetsUrl, data }: ZodiacProps) => {
  const zodiacSign =
    data.zodiacSign.at(0).toUpperCase() + data.zodiacSign.slice(1)

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
            src={`${assetsUrl}/zodiac/${data.zodiacSign.toLowerCase()}.png`}
            width={100}
            height={100}
            alt={`${data.zodiacSign} by Freepik - flaticon.com`}
          />
        </Column>

        <Column width={36} />

        <Column valign="middle">
          <Text
            style={{
              fontWeight: 700,
              fontSize: 24,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {zodiacSign}
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            {data.summary}
          </Text>
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
