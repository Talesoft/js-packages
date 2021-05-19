import type { Dispatch } from 'react'

/**
 * Pushes a new path to the router, navigating the app.
 */
export type PushRouterAction = { readonly type: 'push'; readonly payload: { path: string } }

/**
 * Pops a path from the router, removing it from the navigation stack.
 */
export type PopRouterAction = { readonly type: 'pop' }

/**
 * Replaces the current router path with a new path without changing the history location.
 */
export type ReplaceRouterAction = { readonly type: 'replace'; readonly payload: { path: string } }

export type ForwardRouterAction = {
    readonly type: 'forward'
    readonly payload: { steps: number }
}

export type BackRouterAction = {
    readonly type: 'back'
    readonly payload: { steps: number }
}

/**
 * A union that includes all possible actions on a router state.
 */
export type RouterAction =
    | PushRouterAction
    | PopRouterAction
    | ReplaceRouterAction
    | ForwardRouterAction
    | BackRouterAction

/**
 * The type of a dispatcher for a router.
 */
export type RouterDispatch = Dispatch<RouterAction>

/**
 * An object containing all actions on routers.
 */
const actions = {
    push(path: string) {
        return { type: 'push', payload: { path } } as PushRouterAction
    },

    pop() {
        return { type: 'pop' } as PopRouterAction
    },

    replace(path: string) {
        return { type: 'replace', payload: { path } } as ReplaceRouterAction
    },

    forward(steps = 1) {
        return { type: 'forward', payload: { steps } } as ForwardRouterAction
    },

    back(steps = 1) {
        return { type: 'back', payload: { steps } } as BackRouterAction
    },
}

export default actions
