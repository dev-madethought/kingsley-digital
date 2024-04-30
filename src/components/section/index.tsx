import { ReactNode } from "react"

type SectionProps = {
  id: string
  children: ReactNode
}

export const Section = ({ id, children }: SectionProps) => {
  return <section id={id}>{children}</section>
}
