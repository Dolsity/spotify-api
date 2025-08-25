import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import type { RootState } from '../store'

export default useSelector as TypedUseSelectorHook<RootState>
