"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import groq from "groq"
import { useDispatch, useSelector } from "react-redux"

import { Box } from "@/components/box"
import { Header } from "@/components/header"
import { LoadingAnimation } from "@/components/loading-animation"
import ModalManager from "@/components/modal-manager"
import { Cookies } from "@/containers/cookies"
import { Footer } from "@/containers/footer"
import { type ContentItem, renderComponent } from "@/lib/render"
import { client } from "@/sanity/lib/client"
import { setStep } from "@/state/reducers/intro"
import { RootState } from "@/state/store"
import { STEPS } from "@/types/intro"

type PageProps = {
  content: ContentItem[]
}

const pageQuery = groq`*[_type == "page" && slug.current == $slug]`

export default function Page() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug } = router.query
  const [pageData, setPageData] = useState<PageProps | null>(null)
  const { firstTime } = useSelector((state: RootState) => state.intro)

  useEffect(() => {
    // on initial page load, the router is not ready yet
    if (router.asPath === "/[[...slug]]") return
    const nextSlug = slug || ["homepage"]

    client
      .fetch(pageQuery, { slug: nextSlug[0] })
      .then(async (data) => {
        // if no data is returned, redirect to homepage
        if (data.length === 0) {
          router.push("/")
        } else {
          setPageData(data[0])
          // only animate the very first time the user lands on the homepage.
          if (firstTime) {
            dispatch(setStep(STEPS.ANIMATE))
          }
        }
      })
      .catch(console.error)
  }, [dispatch, router, slug, router.asPath, firstTime])

  return (
    <>
      <Box
        css={{
          position: "relative",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {pageData?.content?.map(renderComponent)}
      </Box>

      <Header />

      <Footer />
      <Cookies />
      <ModalManager />

      <LoadingAnimation content={pageData?.content} />
    </>
  )
}
