import { ITime, prettyHours, prettyMins } from './utils'
import { action, tags } from '@newtack/snell/src'

let { input, div, button, h2 } = tags

const styles = {
  amPm: {
    background: '#D1C4E9',
    border: '1px solid white',
    borderRadius: '.5em',
    fontSize: '.8em',
    height: '4em',
    padding: '1em',
    width: '4em'
  },
  h2: {
    marginBottom: '.2em',
    marginTop: '.2em'
  },
  hrs: {
    borderRadius: '.5em',
    fontSize: '1em',
    marginRight: '.5em',
    textAlign: 'center',
    width: '4em',
  },
  inputWrapper: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center'
  },
  mainWrapper: {
    alignItems: 'center',
    background: '#90CAF9',
    borderRadius: '.2em',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    display: 'flex',
    flexFlow: 'column',
    fontSize: '4em',
    margin: '.1em',
    padding: '.2em',
  },
  mins: {
    borderRadius: '.5em',
    fontSize: '1em',
    marginRight: '.5em',
    textAlign: 'center',
    width: '4em'
  }
}

const changeHrs = (time: ITime) => action(function(e: any) {
  const parsed = parseInt(e.target.value, 10)
  if (parsed > 12 || parsed < 0) {
    e.target.value = prettyHours(time.hrs)
  } else if (parsed === 13) {
    time.hrs = 1
  } else if (!isNaN(parsed)) {
    time.hrs = parsed
  }
})

const changeMins = (time: ITime) => action(function(e: any) {
  const parsed = parseInt(e.target.value, 10)
  if (parsed > 60 || parsed < 0) {
    e.target.value = prettyMins(time.mins)
  } else {
    time.mins = parsed
  }
})

const toggleAm = (time: ITime) => action(function() {
  time.am = !time.am
})

export const timeEditor = ({ time, label }: { time: ITime, label: string}) => {
  const hrsProps = {
    max: 12,
    min: 0,
    oninput: changeHrs(time),
    style: styles.hrs,
    type: 'number',
    value: () => prettyHours(time.hrs)
  }
  const minsProps = {
    max: 60,
    min: 0,
    oninput: changeMins(time),
    style: styles.mins,
    type: 'number',
    value: () => prettyMins(time.mins)
  }
  const amPmProps = {
    onclick: toggleAm(time),
    style: styles.amPm
  }
  return div({ style: styles.mainWrapper }, [
    h2({ style: styles.h2 }, [label]),
    div({ style: styles.inputWrapper }, [
      input(hrsProps),
      input(minsProps),
      button(amPmProps, [() => time.am ? 'AM' : 'PM'])
    ])
  ])
}

