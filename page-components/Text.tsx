/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createElement } from 'react'

function Text({
  type = 'p',
  className = '',
  onClick,
  text,
  style,
  textStroke,
  children,
  truncate,
  onMouseEnter,
  onMouseLeave,
}: {
  type?: string
  className?: string
  children?: ReactNode
  text?: string | ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  textStroke?: { color: string } | boolean
  truncate?: number | null
  onMouseEnter?: any
  onMouseLeave?: any
}) {
  const textStrokeStyle = textStroke
    ? {
        '-webkit-text-stroke':
          '1px ' + 'black',
      }
    : {}

  let truncatedText = null
  if (truncate && text) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const text_length = text.length
    truncatedText =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      text.slice(0, truncate) + (text_length > truncate ? '...' : '')
  }

  return createElement(
    type,
    {
      className: className + ' text-[#333333]',
      style: {
        ...textStrokeStyle,
        ...style,
      },
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
    },
    truncatedText || text || children
  )
}

export default Text
