import groq from "groq"
import { call, put, takeLatest } from "redux-saga/effects"
import Cookie from "universal-cookie"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { client } from "@/sanity/lib/client"
import { English, Korean, Languages } from "@/types/language"

// import { setModal } from "./modals"

interface IState {
  ready: boolean
  language: Languages
  settings: any
  menu: any
}

const initialState: IState = {
  ready: false,
  language: English,
  settings: null,
  menu: null,
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
    setMenu(state, action: PayloadAction<any>) {
      state.menu = action.payload
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
    },
    "contacts": {
      "title": contactsTitle,
      "description": contactsDescription,
      "name": contactsName,
      "phone": contactsPhone,
      "organisation": contactsOrganisation,
      "email": contactsEmail,
      "subject": contactsSubject,
      "subjects": contactsSubjects,
      "message": contactsMessage,
      "subscribe": contactsSubscribe
    },
    "buttons": {
      "biography": buttonsReadBio,
      "email": buttonsEmail,
      "linkedin": buttonsLinkedIn,
      "gotit": buttonsGotIt,
      "learnmore": buttonsLearnMore,
      "contactus": buttonsContactUs,
      "map": buttonsMap,
      "submit": buttonsSubmit
    }
  }`
  return client.fetch(settingsQuery)
}

function fetchMenuData() {
  const menuQuery = groq`*[_type == "page" && title == "Homepage"] {
    "content": content[!(_type == "hero" && !defined(menu))] {
      _type,
      menu
    }
  }
  `
  return client.fetch(menuQuery)
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

  // 3) fetch menu data from homepage
  const data = yield call(fetchMenuData)
  const menu = data?.[0]?.content
    .filter((item: any) => item.menu !== null)
    .map((item: any) => ({ id: item._type, label: item.menu }))
  yield put(slice.actions.setMenu(menu))

  // 4) fire ready event
  yield put(slice.actions.setReady(true))

  // 5) simulate fake modal
  // yield put(setModal({ type: "contacts" }))
}

export function* saga() {
  yield takeLatest("global/getInitialData", handleSaga)
}
