import type { RouterState } from './states'

/**
 * Creates the initial state for a router
 *
 * @param value The initial path of the router.
 */
export default function createInitialRouterState(initialPath: string) {
    return {
        path: initialPath,
        history: [initialPath],
        offset: 0,
        first: true,
        last: true,
    } as RouterState
}
