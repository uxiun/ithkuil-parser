import { atom } from "jotai"
export const inputAtom = atom("")
export const translateRuleAtom = atom(new Map([
  ["", ""],
]))
export const tempListAtom = atom([])