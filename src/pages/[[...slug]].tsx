import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import groq from "groq"

import { Box } from "@/components/box"
import { Hero } from "@/containers/hero"
import { People } from "@/containers/people"
import { Philosophy } from "@/containers/philosophy"
import { client } from "@/sanity/lib/client"
import {
  Hero as HeroProps,
  People as PeopleProps,
  Philosophy as PhilosophyProps,
} from "@/types/sanity"

/*
{true && <Hero />}
{true && <Philosophy />}
{false && <People />}
{false && <Services />}
{false && <Contacts />}
{true && <Footer />}
*/

type ContentItem = (HeroProps | PhilosophyProps | PeopleProps) & {
  _key: string
}

type PageProps = {
  content: ContentItem[]
}

const renderComponent = (props: ContentItem) => {
  switch (props._type) {
    case "hero":
      return <Hero key={props._key} {...props} />
    case "philosophy":
      return <Philosophy key={props._key} {...props} />
    case "people":
      return <People key={props._key} {...props} />
    default:
      return null
  }
}

const pageQuery = groq`*[_type == "page" && slug.current == $slug]`

export default function Page() {
  const router = useRouter()
  const { slug } = router.query
  const [pageData, setPageData] = useState<PageProps>()

  useEffect(() => {
    const nextSlug = slug || "homepage"
    client
      .fetch(pageQuery, { slug: nextSlug })
      .then((data) => setPageData(data[0]))
      .catch(console.error)
  }, [slug])

  if (!pageData) return <Box>Loading...</Box>

  return (
    <Box css={{ flexDirection: "column" }}>
      {pageData.content?.map(renderComponent)}
    </Box>
  )
}
