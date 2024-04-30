import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import groq from "groq"

import { Box } from "@/components/box"
import { Header } from "@/components/header"
import ModalManager from "@/components/modal-manager"
import { Section } from "@/components/section"
import { Contacts } from "@/containers/contacts"
import { Cookies } from "@/containers/cookies"
import { Footer } from "@/containers/footer"
import { Hero } from "@/containers/hero"
import { People } from "@/containers/people"
import { Philosophy } from "@/containers/philosophy"
import { Services } from "@/containers/services"
import { client } from "@/sanity/lib/client"
import {
  Contacts as ContactsProps,
  Hero as HeroProps,
  People as PeopleProps,
  Philosophy as PhilosophyProps,
  Services as ServicesProps,
} from "@/types/sanity"

type ContentItem = (
  | ContactsProps
  | HeroProps
  | PeopleProps
  | PhilosophyProps
  | ServicesProps
) & {
  _key: string
}

type PageProps = {
  content: ContentItem[]
}

const renderComponent = (props: ContentItem) => {
  const common = { key: props._key, id: props._type }
  switch (props._type) {
    case "hero":
      return (
        <Section {...common}>
          <Hero {...props} />
        </Section>
      )
    case "philosophy":
      return (
        <Section {...common}>
          <Philosophy {...props} />
        </Section>
      )
    case "people":
      return (
        <Section {...common}>
          <People {...props} />
        </Section>
      )
    case "services":
      return (
        <Section {...common}>
          <Services {...props} />
        </Section>
      )
    case "contacts":
      return (
        <Section {...common}>
          <Contacts {...props} />
        </Section>
      )
    default:
      return null
  }
}

const pageQuery = groq`*[_type == "page" && slug.current == $slug]`

export default function Page() {
  const router = useRouter()
  const { slug } = router.query
  const [pageData, setPageData] = useState<PageProps | null>(null)

  useEffect(() => {
    // on initial page load, the router is not ready yet
    if (router.asPath === "/[[...slug]]") return
    const nextSlug = slug || ["homepage"]

    client
      .fetch(pageQuery, { slug: nextSlug[0] })
      .then((data) => {
        // if no data is returned, redirect to homepage
        if (data.length === 0) {
          router.push("/")
        } else {
          setPageData(data[0])
        }
      })
      .catch(console.error)
  }, [router, slug, router.asPath])

  if (!pageData) return <Box>Loading...</Box>

  return (
    <>
      <Header />
      <Box css={{ flexDirection: "column" }}>
        {pageData?.content?.map(renderComponent)}
        <Footer />
        <Cookies />
      </Box>
      <ModalManager />
    </>
  )
}
