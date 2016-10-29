import { Session } from './stores'
import { action, tags } from '@newtack/snell/src'

let { button, div, h2, input } = tags

const styles = {
  addBMButton: {
    background: '#D1C4E9',
    border: '1px solid white',
    borderRadius: '.5em',
    fontSize: '1em',
    marginTop: '.3em',
    padding: '1em'
  },
  bodyMotion: {
    borderRadius: '.5em',
    fontSize: '1.3em',
    height: '2em',
    margin: '.25em',
    textAlign: 'center',
    width: '4em'
  },
  bodyMotionWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column'
  },
  header: {
    marginBottom: '.2em',
    marginTop: '.2em'
  },
  taInput: {
    borderRadius: '.5em',
    fontSize: '1.7em',
    height: '2em',
    textAlign: 'center',
    width: '4em'
  },
  taWrapper: {
    alignItems: 'center',
    background: '#90CAF9',
    borderRadius: '.2em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    display: 'flex',
    flexFlow: 'column',
    fontSize: '4em',
    padding: '.4em'
  }
}

function formatBM(bm: string) {
  return bm === '0' ? '' : bm
}

const handleKeyPress = (session: Session, index: number) => action(function(e) {
  const charCode = e.which ? e.which : e.keyCode
  if (charCode === 13) {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed)) {
      session.updateBodyMotion(index, parsed)
    }
    const length = session.bodyMotion.length
    if (length - 1 === index) {
      session.addBodyMotion()
      setTimeout(function() {
        document.getElementById(`body-motion-${length}`).focus()
      }, 20)
    }
  }
  if (charCode === 46 && e.srcElement.value.split('.').length > 1) {
    return false
  }
  if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false
  }
  return true
})

const bodyMotion = ({ index, session }: { index: number, session: Session }) =>
  input({
    id: 'body-motion-' + index,
    onkeypress: handleKeyPress(session, index),
    style: styles.bodyMotion,
    value: () => formatBM(session.bodyMotion[index].toString())
  })

export const sessionTA = (session: Session) =>
  div({ style: styles.taWrapper }, [
    h2({ style: styles.header }, ['Base TA']),
    input({
      oninput: session.changeTa,
      style: styles.taInput,
      type: 'number',
      value: () => session.baseTA.toString()
    }),
    button({
      onclick: session.addBodyMotion,
      style: styles.addBMButton
    }, ['Add Body Motion']),
    () => div({ style: styles.bodyMotionWrapper }, session.bodyMotion.map(
        (_, index) => bodyMotion({ index, session })
      )
    )
  ])
