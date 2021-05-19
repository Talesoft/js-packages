import { createContext, useContext } from 'react'
import { RouterDispatch } from './actions'
import createInitialRouterState from './createInitialRouterState'
import { RouterState } from './states'

const Context = createContext([createInitialRouterState('/'), () => undefined] as readonly [
    RouterState,
    RouterDispatch,
])

export const RouterProvider = Context.Provider

export default function useRouterContext() {
    return useContext(Context)
}
