import { getDiff } from '../src/utils'

describe('getDiff', () => {
  it('should do a simple difference between 12:00am and 12:00am', () => {
    expect(getDiff({ am: true, hrs: 0, mins: 0 }, { am: true, hrs: 0, mins: 0 })).toBe(0)
  })
  it('should get the difference between 1 pm and 2pm', () => {
    expect(getDiff({ am: false, hrs: 2, mins: 0 }, { am: false, hrs: 1, mins: 0 })).toBe(60)
  })
  it('should get the difference between 6:23pm and 2:23pm', () => {
    expect(getDiff({ am: false, hrs: 6, mins: 23 }, { am: false, hrs: 2, mins: 23 })).toBe(240)
  })
})
