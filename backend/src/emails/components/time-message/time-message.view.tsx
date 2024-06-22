import { Column, Row, Section } from '@react-email/components'
import { differenceInHours, format } from 'date-fns'
import * as React from 'react'

export type TimeMessageProps = {
  from: Date
  children: React.ReactNode
  to: Date
}

export const TimeMessage = ({ from, children, to }: TimeMessageProps) => {
  const hoursDifference = differenceInHours(to, from)
  const isAllDay = hoursDifference == 24

  return (
    <Section bgcolor="#f4f4f4">
      <Row>
        <Column height={20} />
      </Row>

      <Row>
        <Column>
          <Section>
            <Column width={20}></Column>

            <Column width={100} style={{ fontSize: 28 }} valign="top">
              {isAllDay && <b style={{ fontWeight: 700 }}>All day</b>}

              {!isAllDay && (
                <b style={{ fontWeight: 700 }}>{format(from, 'HH:mm')}</b>
              )}

              {!isAllDay && to && (
                <>
                  <br />
                  to
                  <br />
                  <b style={{ fontWeight: 700 }}>{format(to, 'HH:mm')}</b>
                </>
              )}
            </Column>

            <Column width={60}></Column>

            <Column valign="top" style={{ fontSize: 25 }}>
              {children}
            </Column>

            <Column width={20}></Column>
          </Section>
        </Column>
      </Row>

      <Row>
        <Column height={20} />
      </Row>
    </Section>
  )
}
