import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import groq from "groq"
import { useDispatch, useSelector } from "react-redux"

import { AnimateRectMask } from "@/components/animate-rect-mask"
// import { AnimateRectMask } from "@/components/animate-rect-mask"
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

// import { delay } from "@/utils"

type PageProps = {
  content: ContentItem[]
}

const pageQuery = groq`*[_type == "page" && slug.current == $slug]`

export default function Page() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug } = router.query
  const [pageData, setPageData] = useState<PageProps | null>(null)
  const { step } = useSelector((state: RootState) => state.intro)
  console.log("render", step)

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
          // fake a 2 second delay
          // await delay(2000)
          setPageData(data[0])
          dispatch(setStep(1))
        }
      })
      .catch(console.error)
  }, [dispatch, router, slug, router.asPath])

  return (
    <>
      <LoadingAnimation />
      <AnimateRectMask>
        <Header />
        <Box
          css={{
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {pageData?.content?.map(renderComponent)}
        </Box>
        <Footer />
        <Cookies />
        <ModalManager />
      </AnimateRectMask>
    </>
  )
}
