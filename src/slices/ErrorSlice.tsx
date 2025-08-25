import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type iErrorData = {
  name: string
  message: string
} | null

const slice = createSlice({
  name: 'error',
  initialState: null as iErrorData,
  reducers: {
    setError: (_: unknown, action: PayloadAction<(Error & { response?: string }) | null>) => {
      if (action.payload) {
        const response_str = action.payload.response
        if (response_str) {
          try {
            const response = JSON.parse(response_str)
            return {
              name: `HTTP Error ${response.error.status}`,
              message: response.error.message,
            }
          } catch (err) {
            return {
              name: 'Error',
              message: (err as Error).message,
            }
          }
        } else {
          return {
            name: action.payload.name,
            message: action.payload.message,
          }
        }
      } else {
        return null
      }
    },
  },
})

export const { setError } = slice.actions
export default slice.reducer
