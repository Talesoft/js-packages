import styled from '@emotion/styled'
import { createElement } from 'react'

export interface GridProps {
    inline?: boolean
    templateColumns?: string
    templateRows: string
}

const Grid = styled.div<GridProps>(({ inline }) => ({
    display: `${inline ? 'inline-' : ''}grid`,
}))
