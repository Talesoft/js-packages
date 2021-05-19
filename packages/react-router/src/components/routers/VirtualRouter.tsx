import React from 'react'
import { PropsWithChildren } from 'react'
import { RouterProvider } from '../../useRouterContext'
import useRouterReducer from '../../useRouterReducer'

export default function VirtualRouter({ children }: PropsWithChildren<Record<string, unknown>>) {
    const stateDispatchTuple = useRouterReducer('/')
    return <RouterProvider value={stateDispatchTuple}>{children}</RouterProvider>
}
