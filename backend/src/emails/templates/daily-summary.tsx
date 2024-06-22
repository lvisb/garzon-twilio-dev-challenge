import { BaseHTML } from '#emails/components/base-html/base-html.view.js'
import { Header } from '#emails/components/header/header.view.js'
import { Column, Row, Section, Text } from '@react-email/components'
import { TimeMessage } from '#emails/components/time-message/time-message.view.js'
import { FeaturedMessage } from '#emails/components/featured-message/featured-message.view.js'
import { Blockquote } from '#emails/components/blockquote/blockquote.view.js'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { DailySummary } from '#api/daily-summary/types/daily-summary.type.js'
import { Weather } from '#emails/components/weather/weather.view.js'
import React from 'react'
import { Zodiac } from '#emails/components/zodiac/zodiac.view.js'

type EmailProps = {
  assetsUrl: string
  appTitle: string
  appUrl: string
  timezone: string
  weatherJson: DailySummary.Weather.Json
  eventsJson: DailySummary.Events.Json
  horoscopeJson: DailySummary.Horoscope.Json
  name: string
}

const Email = ({
  assetsUrl = '/static',
  appTitle = 'App Name',
  appUrl = 'http://localhost',
  timezone = 'UTC',
  weatherJson = {
    icon: 'sun',
    summary: 'Nam libero justo laoreet sit.',
  },
  eventsJson = {
    events: [
      {
        title: 'Event 1',
        startDate: '2021-01-01T10:00:00Z',
        endDate: '2021-01-01T11:00:00Z',
      },
      {
        title: 'Event 2',
        startDate: '2021-01-01T17:00:00Z',
        endDate: '2021-01-02T17:00:00Z',
      },
    ],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    motivational_quote:
      'Urna molestie at elementum eu. Enim blandit volutpat maecenas volutpat blandit aliquam. Venenatis cras sed felis eget velit aliquet sagittis id consectetur. ',
  },
  horoscopeJson = {
    zodiacSign: 'capricorn',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus.',
  },
  name = 'Lorem Ipsum Dolor',
}: EmailProps) => {
  const date = toZonedTime(new Date(), timezone)

  return (
    <BaseHTML appTitle={appTitle}>
      <Header appTitle={appTitle} appUrl={appUrl} assetsUrl={assetsUrl} />

      <Section>
        <Row>
          <Column align="center">
            <Text
              style={{
                fontSize: 28,
                lineHeight: 1.5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              Hey <b style={{ fontWeight: 700 }}>{name}</b>,<br />I hope you
              have a fantastic day ahead!
            </Text>
            <br />
            <Text
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              Today is <strong>{format(date, 'EEEE')}</strong>,{' '}
              <strong>{format(date, 'MMMM dd')}</strong>.<br />
              Here is your summary for the day:{' '}
            </Text>
          </Column>
        </Row>
      </Section>

      <Weather assetsUrl={assetsUrl} data={weatherJson} />

      <Section>
        <Row>
          <Column
            align="center"
            style={{
              fontSize: 26,
              lineHeight: 1.5,
            }}
          >
            {eventsJson.summary}
          </Column>
        </Row>
      </Section>

      <Section>
        <Row>
          <Column height={44} />
        </Row>
      </Section>

      {eventsJson.events.map((event, index) => (
        <React.Fragment key={index}>
          <TimeMessage
            from={toZonedTime(event.startDate, timezone)}
            to={toZonedTime(event.endDate, timezone)}
          >
            {event.title}
          </TimeMessage>

          <Section>
            <Row>
              <Column height={30} />
            </Row>
          </Section>
        </React.Fragment>
      ))}

      <Zodiac data={horoscopeJson} assetsUrl={assetsUrl} />

      <Blockquote assetsUrl={assetsUrl}>
        {eventsJson.motivational_quote}
      </Blockquote>
    </BaseHTML>
  )
}

export default Email
