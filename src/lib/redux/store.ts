import { configureStore, type ThunkAction , type Action } from "@reduxjs/toolkit";

import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
    type TypedUseSelectorHook,
} from 'react-redux'

import { reducer } from "./rootReducer";

export const reduxStore=configureStore({
    reducer,
})

export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>