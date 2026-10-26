import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import markPortrait from '../assets/mark.png'
import { BookGlyph } from './icons'

/** A screen's main heading. It takes focus on arrival so keyboard and screen-reader users start at the top. */
export function ScreenHeading({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0 })
  }, [])
  return (
    <header className="screen-heading">
      <h1 ref={ref} tabIndex={-1}>
        {children}
      </h1>
      {hint && <p className="screen-heading__hint">{hint}</p>}
    </header>
  )
}

/** Mark's current line. It sits at the top of the interaction column on every stage. */
export function MarkStrip({ children }: { children: ReactNode }) {
  return (
    <aside className="mark-strip" aria-label="Mark, the wizard">
      <img className="portrait" src={markPortrait} alt="" width="320" height="320" />
      <div className="mark-strip__speech" role="status" aria-live="polite">
        <span className="mark-strip__name">Mark</span>
        <p>{children}</p>
      </div>
    </aside>
  )
}

/** Secondary action bottom-left, primary action bottom-right, on every screen. */
export function ActionBar({ secondary, primary }: { secondary?: ReactNode; primary?: ReactNode }) {
  return (
    <div className="actions">
      <div className="actions__secondary">{secondary}</div>
      <div className="actions__primary">{primary}</div>
    </div>
  )
}

export function Portrait({ speaker }: { speaker: 'mark' | 'narrator' }) {
  if (speaker === 'mark') {
    return <img className="portrait portrait--large" src={markPortrait} alt="Mark, the wizard" width="320" height="320" />
  }
  return (
    <div className="portrait portrait--large portrait--book" role="img" aria-label="The storybook">
      <BookGlyph />
    </div>
  )
}
