import { createContext, useContext } from 'react'

/** True once the enclosing SlideFrame has entered the viewport. */
export const SeenContext = createContext(false)
export const useSeen = () => useContext(SeenContext)
