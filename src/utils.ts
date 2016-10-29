export interface ITime {
  am: boolean
  hrs: number
  mins: number
}

export function prettyHours(hrs: number): string {
  const base = Math.trunc(hrs / 60)
  if (base === 0) {
    return '12'
  }
  return base.toString()
}

export function prettyMins(mins: number): string {
  return (mins % 60).toString()
}

export function getDiff(a: ITime, b: ITime): number {
  const valA = a.mins + (a.am ? 0 : 720) + a.hrs * 60
  const valB = b.mins + (b.am ? 0 : 720) + b.hrs * 60
  return valA > valB ? valA - valB : 0
}

export function round(num: number) {
  return Math.round(num * 100) / 100
}

export function curry<T extends Function>(f: T): T {
  const scope = this
  function curried() {
    return arguments.length < f.length ?
      curried.bind(scope, ...arguments) :
      f.apply(scope, arguments)
  }
  return (curried as any)
}

export const reduce = curry(function reduce<T, U>(f: (acc: U, v: T) => U, init: U, arr: T[]): U {
  let acc = init
  for (let i = 0; i < arr.length; i++) {
    acc = f(acc, arr[i])
  }
  return acc
})

export const sum = curry(function sum(a: number, b: number) {
  return a + b
})

export const assign = Object.assign.bind(Object)
