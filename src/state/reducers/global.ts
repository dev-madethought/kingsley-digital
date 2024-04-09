import { put, takeLatest } from "redux-saga/effects"
import Cookie from "universal-cookie"

import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

import { getSteps } from "@/sdk"
import { English, Korean, Languages, Node } from "@/types"

interface IState {
  ready: boolean
  language: Languages
  nodes: Node[]
}

const initialState: IState = {
  ready: false,
  language: English,
  nodes: [],
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
    setInitialData(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload
    },
  },
})

export const { setReady, getInitialData, setLanguage } = slice.actions
export default slice.reducer

function* handleSaga(): any {
  // 1) initial data
  const data = yield getSteps()
  yield put(slice.actions.setInitialData(data))

  // 2) language (We're explicitely not using nextjs i18n)
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

  // 3) ready
  yield put(slice.actions.setReady(true))
}

export function* saga() {
  yield takeLatest("global/getInitialData", handleSaga)
}
