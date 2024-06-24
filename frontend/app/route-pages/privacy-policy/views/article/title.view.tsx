import { ReactNode } from "react"

type Props = {
 children:ReactNode
}

export const Title = ({ children }: Props) => {
  return <h2 className="font-extrabold text-[1.75rem] !my-10">{children}</h2>
}
