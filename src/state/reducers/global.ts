import groq from "groq"
import { call, put, takeLatest } from "redux-saga/effects"
import Cookie from "universal-cookie"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { client } from "@/sanity/lib/client"
import { English, Korean, Languages } from "@/types/language"

// import { setModal } from "./modals"
// import { setService } from "./service"

interface IState {
  ready: boolean
  language: Languages
  settings: any
}

const initialState: IState = {
  ready: false,
  language: English,
  settings: null,
}

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload
    },
    setLanguage(state, action: PayloadAction<Languages>) {
      state.language = action.payload
    },
    getInitialData(state) {
      state.ready = false
    },
    setInitialData(state, action: PayloadAction<any>) {
      state.settings = action.payload
    },
  },
})

export const { setReady, getInitialData, setLanguage } = slice.actions
export default slice.reducer

function fetchSettingsData() {
  const settingsQuery = groq`*[_type == "settings"]{
    "links": links[]->{_id,title, slug},
    socialLinks,
    "newsletter": {
      "title": newsletterTitle,
      "agreement": newsletterAgreement,
      "placeholder": newsletterPlaceholder,
    },
    "cookies":{
      "message": cookiesMessage,
      "cta": cookiesCTA,
    },
    "buttons": {
      "biography": buttonsReadBio,
      "email": buttonsEmail,
      "linkedin": buttonsLinkedIn,
      "learnMore": buttonsLearnMove,
    }
  }`
  return client.fetch(settingsQuery)
}

function* handleSaga(): any {
  // 1) load footer
  const settings = yield call(fetchSettingsData)
  yield put(slice.actions.setInitialData(settings[0]))

  // 2) setup language (We're explicitely not using nextjs i18n)
  const cookies = new Cookie()
  let nextLanguage: Languages = English
  const savedLanguage = cookies.get("language")
  if (savedLanguage === Korean) {
    // if cookie is set, use it
    nextLanguage = Korean
  } else {
    // if cookie is not set, read browser language
    switch (navigator.language.split("-")[0]) {
      case "ko":
        nextLanguage = Korean
        break
      default:
        nextLanguage = English
    }
  }
  yield put(slice.actions.setLanguage(nextLanguage))

  // 3) fire ready event
  yield put(slice.actions.setReady(true))

  // 4) fake modal
  // yield put(
  //   setService({
  //     description: [
  //       {
  //         value: [
  //           {
  //             markDefs: [],
  //             children: [
  //               {
  //                 _type: "span",
  //                 marks: [],
  //                 text: "Lorem ipsum dolor sit amet EN",
  //                 _key: "3f80e73b98a5",
  //               },
  //             ],
  //             _type: "block",
  //             style: "normal",
  //             _key: "1477db3373d0",
  //           },
  //         ],
  //         _type: "internationalizedArrayBlockContentValue",
  //         _key: "en",
  //       },
  //       {
  //         _type: "internationalizedArrayBlockContentValue",
  //         _key: "ko",
  //         value: [
  //           {
  //             _key: "93e35c97ade3",
  //             markDefs: [],
  //             children: [
  //               {
  //                 _type: "span",
  //                 marks: [],
  //                 text: "Lorem ipsum dolor sit amet KO",
  //                 _key: "a4d3d0816676",
  //               },
  //             ],
  //             _type: "block",
  //             style: "normal",
  //           },
  //         ],
  //       },
  //     ],
  //     _key: "8f4bd132dab1",
  //     title: [
  //       {
  //         value: "Portfolio Health Checks",
  //         _type: "internationalizedArrayStringValue",
  //         _key: "en",
  //       },
  //       {
  //         _type: "internationalizedArrayStringValue",
  //         _key: "ko",
  //         value: "Item 1 KO",
  //       },
  //     ],
  //     sinopsis: [
  //       {
  //         _type: "internationalizedArrayStringValue",
  //         _key: "en",
  //         value: "lorem ipsum EN",
  //       },
  //       {
  //         _type: "internationalizedArrayStringValue",
  //         _key: "ko",
  //         value: "lorem ipsum KO",
  //       },
  //     ],
  //     images: [
  //       {
  //         _type: "image",
  //         _key: "aca9f4da6605",
  //         asset: {
  //           _ref: "image-429a9a73debd061bfdbcbc5280fd19936503fd12-563x794-jpg",
  //           _type: "reference",
  //         },
  //       },
  //       {
  //         _type: "image",
  //         _key: "b580194e6edb",
  //         asset: {
  //           _ref: "image-77da911fae444f3f5206328bee43425b0ac30a32-1400x1750-jpg",
  //           _type: "reference",
  //         },
  //       },
  //     ],
  //     _type: "service",
  //   })
  // )
  // yield put(setModal({ type: "service" }))
}

export function* saga() {
  yield takeLatest("global/getInitialData", handleSaga)
}
