// import * as wasm from "wasm-pack-template"
// wasm.greet()
import { initWorker } from "worker-lib"

const add = (d: number, f: number) => {
  for (let i = 0; i < 100000; i++){
    if (i === 99999) { console.log("working, i =", i) }
  }
  return d+f;
}
const error = (d: number, f: number) => {
  for (let i = 0; i < 100000; i++);
  throw new Error("throw")
  return d+f;
}

export const fibo_slow = (n: number) => {
  const go = (n: number, times: number): [number, number] => {
    switch (n) {
      case 0: return [0,0];
      case 1: return [0,1];
      default:
        let d = go(n-1, times)
        let f = go(n-2, 0)
        return [d[0]+f[0]+1, d[1]+f[1]]
    }
  }
  return go(n, 0)
}

export const fibo_fast = (n: number) => {
  const memo = new Map<number, number>()
  const go = (n: number, times: number): [number, number] => {
    switch(n){
      case 0: return [0,0]
      case 1: return [0,1]
      default:
        let d = memo.get(n)
        if (d == undefined){
          let d = go(n-1, times)
          let f = go(n-2, 0)
          memo.set(n, d[1]+f[1])
          return [d[0]+f[0]+1, d[1]+f[1]]
      } else return [times, d]
    }
  }
  return go(n, 0)
}

const map = initWorker({add, error, fibo_slow, fibo_fast})
export type WorkerTest = typeof map



export type Noun = {
  extension: string
}
export type FramedVerb = {

}
export type UnframedVerb = {

}
type readingFormative = {
  slot: number
}
type Reading = readingFormative

export const parseWord = (input: string, reading: Reading) => {
  if (input.length > 0) {

  }
  return {
    extension: ""
  }
}

