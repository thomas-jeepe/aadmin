import { Session, Break } from './stores'
import { timeEditor } from './timeEditor'
import { tags } from '@newtack/snell/src'

let { div, button } = tags

const styles = {
  addBreak: {
    background: '#D1C4E9',
    border: '1px solid white',
    borderRadius: '.5em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    fontSize: '6em',
    padding: '1em'
  },
  breakItem: {
    margin: '1em'
  },
  breaksWrapper: {
    alignItems: 'center',
    borderRadius: '.2em',
    display: 'flex',
    flexFlow: 'column',
    marginTop: '.2em',
    overflow: 'hidden',
    padding: '.4em'
  },
  sessionWrapper: {
    marginBottom: '1em',
    padding: '1em'
  }
}

const breakItem = (store: Break) => div({ style: styles.breakItem }, [
  timeEditor({ label: 'start', time: store.start }),
  timeEditor({ label: 'end', time: store.end })
])

const breaks = (store: Session) => () => div({ style: styles.breaksWrapper }, [
  button({ onclick: store.addBreak, style: styles.addBreak }, ['Add a break']),
  ...store.breaks.map(breakItem)
])

export const sessionTime = (store: Session) => div({ style: styles.sessionWrapper }, [
  timeEditor({ label: 'start', time: store.start }),
  breaks(store),
  timeEditor({ label: 'end', time: store.end })
])
