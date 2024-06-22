import {
  Body,
  Head,
  Html,
  Container,
  Font,
  Column,
  Row,
  Section,
} from '@react-email/components'
import * as React from 'react'

export type BaseHTMLProps = {
  children: React.ReactNode
  appTitle: string
}

export const BaseHTML = ({ children, appTitle }: BaseHTMLProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{appTitle}</title>
        <Font
          fontFamily="Raleway"
          fallbackFontFamily="sans-serif"
          fontWeight={400}
          fontStyle="normal"
          webFont={{
            url: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff2',
            format: 'woff2',
          }}
        />
      </Head>

      <Body
        style={{
          background: '#fff',
          fontFamily: 'Raleway',
          color: '#000',
        }}
      >
        <Container
          width="100%"
          style={{
            maxWidth: 640,
          }}
        >
          <Container
            width="100%"
            style={{
              maxWidth: 530,
              width: '100%',
            }}
          >
            {children}
          </Container>

          <Section>
            <Row>
              <Column height={48} />
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
