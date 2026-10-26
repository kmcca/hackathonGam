import type { TriviaQuestion } from '../worlds'
import { CheckIcon, CrossIcon } from './icons'

interface TriviaCardProps {
  question: TriviaQuestion
  ruledOut: number[]
  solved: boolean
  onAnswer: (option: number) => void
}

export function TriviaCard({ question, ruledOut, solved, onAnswer }: TriviaCardProps) {
  return (
    <section className="trivia" aria-labelledby="trivia-prompt">
      <h2 id="trivia-prompt" className="trivia__prompt">
        {question.prompt}
      </h2>
      <ul className="trivia__options">
        {question.options.map((option, index) => {
          const wrong = ruledOut.includes(index)
          const right = solved && index === question.answer
          const classes = ['option']
          if (wrong) classes.push('option--wrong')
          if (right) classes.push('option--right')
          return (
            <li key={option}>
              <button
                type="button"
                className={classes.join(' ')}
                disabled={wrong || solved}
                aria-disabled={wrong || solved}
                onClick={() => onAnswer(index)}
              >
                <span className="option__text">{option}</span>
                {wrong && (
                  <span className="option__status">
                    <CrossIcon /> Not quite
                  </span>
                )}
                {right && (
                  <span className="option__status">
                    <CheckIcon /> Correct
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
