import veracafe from '../../assets/veracafe.png'
import { INTRO_BEATS, fillName } from '../../story/intro'
import { DialogueBox } from '../DialogueBox'
import { ActionBar } from '../Layout'

interface IntroScreenProps {
  step: number
  playerName: string
  onNext: () => void
  onSkip: () => void
}

export function IntroScreen({ step, playerName, onNext, onSkip }: IntroScreenProps) {
  const beat = INTRO_BEATS[step - 1]
  const last = step === INTRO_BEATS.length
  // The Veracafe is the scene until the page swallows the player.
  const inCafe = step <= 3

  return (
    <main className="screen screen--intro">
      <h1 className="visually-hidden">The story so far</h1>
      <div className={inCafe ? 'scene scene--cafe' : 'scene scene--book'}>
        {inCafe && (
          <img
            className="scene__art"
            src={veracafe}
            alt="Three Veracoders at a table in the Veracafe, drinking glowing green beer beside a stack of fairy-tale books"
          />
        )}
      </div>
      <DialogueBox
        speaker={beat.speaker}
        text={fillName(beat.text, playerName)}
        onNext={onNext}
        nextLabel={last ? 'Look around' : 'Next'}
      />
      <ActionBar
        secondary={
          <button type="button" className="button button--ghost" onClick={onSkip}>
            Skip the story
          </button>
        }
      />
    </main>
  )
}
