

export const powerKetashori = (shori: "round"|"ceil"|"floor") => (m:number, save_keta:number) =>{
  let ms = m.toString().split(".")

  let isMinus = false
  let value = ms[0]
  let hosei = 0
  if (ms.length > 1){
    value = ms.reduce((j,k)=>j+k)
    hosei = ms[1].length
  }
  if (value.startsWith("-")){
    isMinus = true
    hosei--
    let [head, ...v] = value
    value = v.reduce((j,k)=>j+k)
  }
  let sa = value.length - save_keta
  console.log("value:",value)
  console.log("m:",m)
  console.log("sa:", sa)
  if (sa < 1) return m
  else {
    const res =  (sa: number, hosei:number) => (f: (s:number)=>number) => {
      let d = f(m/(10**(sa-hosei))) * 10**(sa-hosei)
      return isMinus ? 0-d : d
    }
    const f = res(sa, hosei)
    switch (shori){
      case "ceil": return f(Math.ceil)
      case "floor": return f(Math.floor)
      case "round": return f(Math.round)
    }
  }
}