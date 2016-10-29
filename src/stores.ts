import { getDiff, ITime, reduce, round, sum } from './utils'
import { action, state } from '@newtack/snell/src'

export class Break {
  @state start: ITime = { am: true, hrs: 0, mins: 0 }
  @state end: ITime = { am: true, hrs: 0, mins: 0 }
  get duration(): number {
    return getDiff(this.end, this.start)
  }
}

export class Session {
  @state baseTA = 0
  @state bodyMotion: number[] = []
  @state breaks: Break[] = []
  @state end: ITime = { am: true, hrs: 0, mins: 0 }
  @state start: ITime = { am: true, hrs: 0, mins: 0 }

  get totalTA(): number {
    return this.baseTA - reduce(sum, 0, this.bodyMotion)
  }

  get totalBreaks(): number {
    return reduce((acc: number, v: Break) => sum(acc, v.duration), 0, this.breaks)
  }

  get totalTime() {
    return getDiff(this.end, this.start) - this.totalBreaks
  }

  get prettyTotal() {
    const hrs = Math.trunc(this.totalTime / 60).toString()
    const mins = (this.totalTime % 60).toString()
    return `${hrs.length === 1 ? '0' + hrs : hrs}:${mins.length === 1 ? '0' + mins : mins}`
  }

  get perHour() {
    if (this.totalTime === 0 || this.totalTA === 0) { return 0 }
    return round((this.totalTA / this.totalTime) * 60)
  }

  @action addBreak() {
    this.breaks.push(new Break())
  }

  @action changeTa(e) {
    this.baseTA = parseFloat(e.target.value)
  }

  @action addBodyMotion() {
    this.bodyMotion.push(0)
  }

  @action updateBodyMotion(index, val) {
    this.bodyMotion[index] = val
  }
}
