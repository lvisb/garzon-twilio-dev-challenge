import { Column, Row, Section, Img } from "@react-email/components";
import * as React from "react";

export type BlockquoteProps = {
  children: React.ReactNode;
  assetsUrl: string;
};

export const Blockquote = ({ children, assetsUrl }: BlockquoteProps) => {
  return (
    <Section>
      <Row>
        <Column align="left">
          <Img
            src={`${assetsUrl}/open-quote.png`}
            width={39}
            height={29}
            alt=""
          />
        </Column>
      </Row>

      <Row>
        <Column height={16} />
      </Row>

      <Row>
        <Column align="center" style={{ fontSize: 30, lineHeight: 1.5 }}>
          {children}
        </Column>
      </Row>

      <Row>
        <Column height={16} />
      </Row>

      <Row>
        <Column align="right">
          <Img
            src={`${assetsUrl}/close-quote.png`}
            width={39}
            height={29}
            alt=""
          />
        </Column>
      </Row>
    </Section>
  );
};
