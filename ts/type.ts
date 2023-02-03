
export const try_parse_number = (s: string) => {
  let converts = [Number(s), parseInt(s), parseFloat(s)]
  return converts.find(k => !isNaN(k))
}

type Range3 = 0|1|2
type Range4 = 0|1|2|3
type Range10 = 0|1|2|3|4|5|6|7|8|9
type Affix5 = {
  type: 1|2|3
  ,degree: Range10
  ,id: string
}


export type Common = {
  affix: {
    slot5: Affix5[]
    slot7: Affix5[]
  }
  concat: Range3
  stem: Range4
  version: "PRC"|"CPT"
  function: "STA"|"DYN"
  context: "EXS"|"FNC"|"RPS"|"AMG"
  specification: "BSC"|"CTE"|"CSV"|"OBJ"
  affiliation: "CSL"|"ASO"|"COA"|"VAR"
  configuration: {
    duplex: boolean
    multi?: {
      similarity: "similar"|"dissimilar"|"fuzzy"
      connectivity: "connected"|"separate"|"fused"
    }
  }
  extension: "DEL"|"PRX"|"ICP"|"ATV"|"GRA"|"DPL"
  perpective: "M"|"G"|"N"|"A"
  essence: "NRM"|"RPV"
  valence: Valence
  phase: Phase
  // concat: number
  // stem: number
  // version: boolean
  // function: boolean
  // context: number
  // specification: number
  // affiliation: number
  // configuration: {
  //   duplex: boolean
  //   multi?: {
  //     similarity: number
  //     connectivity: number
  //   }
  // }
  effect: Range10
  level: Range10
}
const srcValence = {
  mno:"MNO",
  prl:"PRL",
  cro:"CRO",
  rcp:"RCP",
  cpl:"CPL",
  dup:"DUP",
  dem:"DEM",
  cng:"CNG",
  pti:"PTI"
} as const
type Valence = typeof srcValence[keyof typeof srcValence]
const srcPhase = {
  pct: "PCT",
  itr: "ITR",
  rep: "REP",
  itm: "ITM",
  rct: "RCT",
  fre: "FRE",
  erg: "FRG",
  vac: "VAC",
  flc: "FLC"
} as const
type Phase = typeof srcPhase[keyof typeof srcPhase]
type Selector<T> = {
  values: T[]
  index: number
}
