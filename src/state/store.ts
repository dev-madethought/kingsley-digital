import createSagaMiddleware from "redux-saga"
import { all, fork } from "redux-saga/effects"

import { configureStore } from "@reduxjs/toolkit"

import global, { saga as globalSaga } from "./reducers/global"
import modals from "./reducers/modals"
import people from "./reducers/people"
import service from "./reducers/service"

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

export const store: any = configureStore({
  reducer: {
    global,
    modals,
    people,
    service,
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
