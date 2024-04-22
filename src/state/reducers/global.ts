import groq from "groq"
import { call, put, takeLatest } from "redux-saga/effects"
import Cookie from "universal-cookie"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { client } from "@/sanity/lib/client"
import { English, Korean, Languages } from "@/types/language"

// import { setModal } from "./modals"
// import { setPerson } from "./people"

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
  //   setPerson({
  //     image: {
  //       _type: "image",
  //       asset: {
  //         _ref: "image-644b592635bb21864fd9d47477b5228b734a991e-738x914-png",
  //         _type: "reference",
  //       },
  //     },
  //     _type: "person",
  //     name: [
  //       {
  //         _type: "internationalizedArrayStringValue",
  //         _key: "en",
  //         value: "Person1 EN",
  //       },
  //       {
  //         _type: "internationalizedArrayStringValue",
  //         _key: "ko",
  //         value: "Person1 KO",
  //       },
  //     ],
  //     linkedin: "https://www.linkedin.com/in/person",
  //     role: [
  //       {
  //         value: "Role EN",
  //         _type: "internationalizedArrayStringValue",
  //         _key: "en",
  //       },
  //       {
  //         _type: "internationalizedArrayStringValue",
  //         _key: "ko",
  //         value: "Role KO",
  //       },
  //     ],
  //     phone: "+447676456456",
  //     email: "email@email.com",
  //     bio: [
  //       {
  //         value: [
  //           {
  //             style: "normal",
  //             _key: "7ff4d2dde934",
  //             markDefs: [],
  //             children: [
  //               {
  //                 text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ultricies enim. Aenean at nisl molestie nisi laoreet dapibus nec ac est. Duis felis ex, consectetur a massa non, convallis mattis urna.",
  //                 _key: "e57694ab2f600",
  //                 _type: "span",
  //                 marks: [],
  //               },
  //             ],
  //             _type: "block",
  //           },
  //           {
  //             _type: "block",
  //             style: "normal",
  //             _key: "9aa0dd2d5810",
  //             markDefs: [],
  //             children: [
  //               {
  //                 _type: "span",
  //                 marks: [],
  //                 text: "Sed nec metus eget felis pulvinar lacinia. Donec sodales dui lacus, eu vulputate nunc eleifend ac. Vivamus faucibus, lacus eget vestibulum luctus, diam sapien eleifend lorem, id auctor enim tellus sit amet.",
  //                 _key: "2c4459e81e6f",
  //               },
  //             ],
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
  //             _key: "20028fd2e297",
  //             markDefs: [],
  //             children: [
  //               {
  //                 _type: "span",
  //                 marks: [],
  //                 text: "교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다. 나는 헌법을 준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다.\n법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 탄핵소추의 의결을 받은 자는 탄핵심판이.",
  //                 _key: "8203846e24cb0",
  //               },
  //             ],
  //             _type: "block",
  //             style: "normal",
  //           },
  //         ],
  //       },
  //     ],
  //   })
  // )
  // yield put(setModal({ type: "person" }))
}

export function* saga() {
  yield takeLatest("global/getInitialData", handleSaga)
}
