import { Link, Img } from "@react-email/components";

type Props = {
  linkTo: string
  assetsUrl: string;
  appTitle: string;
};

export const Logo = ({ assetsUrl, linkTo, appTitle }: Props) => {
  return (
    <Link href={linkTo} target="_blank">
      <Img
        src={`${assetsUrl}/logo.png`}
        width={281}
        height={294}
        alt={`${appTitle} logo`}
      />
    </Link>
  );
};
