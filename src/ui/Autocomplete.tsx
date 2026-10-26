import { useId, useState } from 'react'
import type { KeyboardEvent } from 'react'

interface AutocompleteProps {
  label: string
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  onSubmit: (value: string) => void
  submitLabel: string
}

/** A text field with a suggestion list (ARIA combobox pattern). Enter submits, arrows pick a suggestion. */
export function Autocomplete({ label, value, onChange, suggestions, onSubmit, submitLabel }: AutocompleteProps) {
  const id = useId()
  const listId = `${id}-list`
  const [active, setActive] = useState(-1)
  const [open, setOpen] = useState(false)
  const showList = open && suggestions.length > 0

  const choose = (text: string) => {
    onChange(text)
    setOpen(false)
    setActive(-1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && suggestions.length) {
      event.preventDefault()
      setOpen(true)
      setActive((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp' && suggestions.length) {
      event.preventDefault()
      setOpen(true)
      setActive((index) => (index <= 0 ? suggestions.length - 1 : index - 1))
    } else if (event.key === 'Enter' && showList && active >= 0) {
      event.preventDefault()
      choose(suggestions[active])
    } else if (event.key === 'Escape' && showList) {
      event.preventDefault()
      setOpen(false)
    }
  }

  return (
    <form
      className="guess-form"
      onSubmit={(event) => {
        event.preventDefault()
        setOpen(false)
        onSubmit(value)
      }}
    >
      <label htmlFor={id} className="guess-form__label">
        {label}
      </label>
      <div className="guess-form__row">
        <div className="combobox">
          <input
            id={id}
            className="input"
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={showList && active >= 0 ? `${id}-option-${active}` : undefined}
            autoComplete="off"
            autoCapitalize="words"
            spellCheck={false}
            value={value}
            onChange={(event) => {
              onChange(event.target.value)
              setOpen(true)
              setActive(-1)
            }}
            onKeyDown={onKeyDown}
            onBlur={() => setOpen(false)}
          />
          {showList && (
            <ul id={listId} className="combobox__list" role="listbox">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={index === active}
                  className={index === active ? 'combobox__option combobox__option--active' : 'combobox__option'}
                  // mousedown fires before the input's blur closes the list.
                  onMouseDown={(event) => {
                    event.preventDefault()
                    choose(suggestion)
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="button button--primary" disabled={!value.trim()}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
