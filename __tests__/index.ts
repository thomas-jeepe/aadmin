import { getDiff } from '../src'

describe('getDiff', () => {
  it('should do a simple difference between 12:00am and 12:00am', () => {
    expect(getDiff({ am: true, mins: 0 }, { am: true, mins: 0 })).toBe(0)
  })
})
