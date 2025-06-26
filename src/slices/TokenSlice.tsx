import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type iTokenData = string | null

const getInitialToken = (): iTokenData => {
  return localStorage.getItem('token') ?? null
}

const slice = createSlice({
  name: 'token',
  initialState: getInitialToken(),
  reducers: {
    setToken: (_: unknown, action: PayloadAction<iTokenData>) => {
      if (action.payload) {
        localStorage.setItem('token', action.payload)
      } else {
        localStorage.removeItem('token')
      }
      return action.payload
    },
  },
})

export const { setToken } = slice.actions
export default slice.reducer
