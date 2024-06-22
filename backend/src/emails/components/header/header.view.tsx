import { Column, Row, Section } from '@react-email/components'
import { Logo } from '#emails/components/logo/logo.view.js'

type Props = {
  appUrl: string
  assetsUrl: string
  appTitle: string
}

export const Header = ({ appUrl, appTitle, assetsUrl }: Props) => {
  return (
    <Section>
      <Row>
        <Column height={32} />
      </Row>

      <Row>
        <Column align="center">
          <Logo appTitle={appTitle} linkTo={appUrl} assetsUrl={assetsUrl} />
        </Column>
      </Row>

      <Row>
        <Column height={32} />
      </Row>
    </Section>
  )
}
