import type { RouterAction } from './actions'
import type { RouterState } from './states'

/**
 * Transforms a router state based on a router action.
 *
 * @param state The router state to transform.
 * @param action The action to transform the state with.
 */
export default function reduceRouterState(state: RouterState, action: RouterAction): RouterState {
    switch (action.type) {
        case 'push': {
            const { path } = action.payload
            const history = [...state.history.slice(0, state.offset + 1), path]
            return {
                ...state,
                path,
                history,
                offset: history.length - 1,
                first: history.length === 1,
                last: true,
            }
        }
        case 'pop': {
            if (state.history.length === 1) {
                return state
            }
            const history = state.history.slice(0, -1)
            const path = history[history.length - 1]
            return {
                ...state,
                path,
                history,
                offset: history.length - 1,
                first: history.length === 1,
                last: true,
            }
        }
        case 'replace': {
            const { path } = action.payload
            const history = state.history.map((currentPath, offset) =>
                offset === state.offset ? path : currentPath,
            )
            return {
                ...state,
                path,
                history,
            }
        }
        case 'forward': {
            const offset = Math.max(
                0,
                Math.min(state.offset + action.payload.steps),
                state.history.length - 1,
            )
            const path = state.history[offset]
            return {
                ...state,
                path,
                offset,
                first: offset === 0,
                last: offset === state.history.length - 1,
            }
        }
        case 'back':
            // Just forward to the "forward"-action
            return reduceRouterState(state, {
                type: 'forward',
                payload: { steps: -action.payload.steps },
            })
    }
}
