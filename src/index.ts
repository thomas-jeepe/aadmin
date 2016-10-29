import { sessionTA } from './sessionTa'
import { sessionTime } from './sessionTime'
import { Session } from './stores'
import { round } from './utils'
import { render, tags } from '@newtack/snell/src'

let { div, h4 } = tags

const styles = {
  h4: {
    margin: '.25em'
  },
  mainWrapper: {
    display: 'flex',
    flexFlow: 'column'
  },
  totalWrapper: {
    alignItems: 'center',
    background: '#5C6BC0',
    borderRadius: '.2em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    display: 'flex',
    flexFlow: 'column',
    fontSize: '4em',
    marginTop: '.2em',
    padding: '.3em'
  }
}

const total = (session: Session) => div({ style: styles.totalWrapper }, [
  h4({ style: styles.h4 }, ['Total Time: ', () => session.prettyTotal]),
  h4({ style: styles.h4 },  ['Total TA: ', () => round(session.totalTA).toString()]),
  h4({ style: styles.h4 }, ['TA Per Hour: ', () => session.perHour.toString()])
])

const main = (session: Session) => div({}, [
  div({ style: styles.mainWrapper }, [
    sessionTime(session),
    sessionTA(session)
  ]),
  total(session)
])

render(main(new Session()), document.getElementById('root'))
