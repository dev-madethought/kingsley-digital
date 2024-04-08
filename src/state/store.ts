import createSagaMiddleware from "redux-saga"
import { all, fork } from "redux-saga/effects"

import { configureStore } from "@reduxjs/toolkit"

import global, { saga as globalSaga } from "./reducers/global"

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

export const store: any = configureStore({
  reducer: {
    global,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

function* rootSaga() {
  yield all([fork(globalSaga)])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
