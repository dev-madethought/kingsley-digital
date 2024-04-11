import groq from "groq"
import { call, put, takeLatest } from "redux-saga/effects"
import Cookie from "universal-cookie"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { client } from "@/sanity/lib/client"
import { English, Korean, Languages } from "@/types/language"

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
}

export function* saga() {
  yield takeLatest("global/getInitialData", handleSaga)
}
