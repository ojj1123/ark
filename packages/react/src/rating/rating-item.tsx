import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRatingContext } from './rating-context'
import { RatingItemContext, RatingItemProvider } from './rating-item-context'

export type RenderIconFn = (state: RatingItemContext) => ReactNode

export type RatingItemProps = Omit<HTMLAtlasProps<'span'>, 'children'> & {
  index: number
  children: ReactNode | RenderIconFn
}

export const RatingItem = forwardRef<'span', RatingItemProps>((props, ref) => {
  const { children, index, ...divProps } = props
  const { getRatingState, getItemProps } = useRatingContext()
  const state = getRatingState(index)
  const icon = typeof children === 'function' ? children(state) : children
  const mergedProps = mergeProps(getItemProps({ index }), divProps)

  return (
    <atlas.span {...mergedProps} ref={ref}>
      <RatingItemProvider value={state}>{icon}</RatingItemProvider>
    </atlas.span>
  )
})
