import { useReducer } from 'react'
import type { RouterDispatch } from './actions'
import createInitialRouterState from './createInitialRouterState'
import reduceAsyncState from './reduceRouterState'
import type { RouterState } from './states'

/**
 * Creates a React reducer for a router state.
 *
 * @param initialPath The initial path of the router state.
 */
export default function useRouterReducer(initialPath = '/') {
    return useReducer(reduceAsyncState, initialPath, createInitialRouterState) as readonly [
        RouterState,
        RouterDispatch,
    ]
}
