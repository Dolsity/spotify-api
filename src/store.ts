import { configureStore } from '@reduxjs/toolkit'

import api from './api/api'
import TokenReducer from './slices/TokenSlice'
import ErrorReducer from './slices/ErrorSlice'
import SnackbarReducer from './slices/SnackbarSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    token: TokenReducer,
    error: ErrorReducer,
    snackbar: SnackbarReducer,
  },
  middleware: (gdm) => gdm().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
