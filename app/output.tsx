'use client';

import { inputAtom } from "@/ts/jotai";
import { fibo_slow, parseWord, WorkerTest } from "@/ts/parse";
import { try_parse_number } from "@/ts/type";
import { powerKetashori } from "@/ts/util";
import { Box, Button, TextField } from "@mui/material";
import { match } from "assert";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createWorker } from "worker-lib"

const execute = createWorker<WorkerTest>(()=>
  new Worker(new URL("../ts/parse", import.meta.url))
, 5)

const Output: FC = () => {
  const [input] = useAtom(inputAtom)
  const {extension} = parseWord(input, {slot: 1})

  return(<>
    <p>extension: {extension}</p>
    <WorkerFC />
    <FiboFC fa="slow" />
    <FiboFC fa="fast" />
  </>)
}

const WorkerFC: FC = () => {
  type Operands = {
    j: string
    k: string
  }
  const {control, getValues, handleSubmit, formState: {errors}} = useForm<Operands>({
    defaultValues: {
      j: "", k: ""
    },
    // reValidateMode: "onChange"
  })
  const [operateResult, setOperateResult] = useState(0)

  const operands: (keyof Operands)[] = ["j", "k"]


  const OperandForm = (name: keyof Operands) => (
    <Controller
      control={control}
      name={name}
      key={name}
      rules={{
        required: "please input"
        ,maxLength: {
          value: 10
          ,message: "10文字以内で"
        }
        // ,pattern: {
        //   value: /^\d+$/
        //   ,message: "数字のみを"
        // }
        ,validate: {
          num: () => {
            let f = getValues(name)
            // let res = match(f, /\d+/)
            // return Boolean(res)
            //上記にするとなぜかworkerが詰まった
            let parsed = try_parse_number(f)
            return parsed !== undefined
          }
        }
      }}
      render={({field: {onChange}})=>(
        <TextField
          onChange={onChange}
          label={"operand "+name}
          error={!!errors[name]}
          helperText={errors[name] && errors[name]?.message}
        />
      )}
    />
  )
  const submit = async(f: Operands) => {
    const r = await execute("add", try_parse_number(f.j)??0, try_parse_number(f.k)??0)
    setOperateResult(r)
  }
  return(<>
    <Box component="form" onSubmit={handleSubmit(submit)} >
      {operands.map(name => OperandForm(name) )}
      <Button type="submit">計算</Button>
    </Box>
    <Box padding={1} >operate result: {operateResult}</Box>
  </>)
}

type FiboProps = {
  fa: string
}
const fa_fibo = (fa: string) => {
  switch (fa) {
    case "slow": return "fibo_slow"
    case "fast": return "fibo_fast"
  }
}
const FiboFC: FC<FiboProps> = ({fa}) => {
  type OneForm = {
    d: string
  }
  const [nums, setNums] = useState<number[]>([])
  const [fiboN, setFiboN] = useState(0)
  const [fibostate, setFibostate] = useState({
    message: "",
    complete: false,
    duration: 0,
  })
  const {control, getValues, handleSubmit, formState: {isValid, errors}} = useForm<OneForm>({defaultValues: {d: ""}})
  const submit = async(f: OneForm) => {
    let n = try_parse_number(f.d)
    setFibostate({
      message:"計算中"
      ,complete: false
      ,duration: 0
    })
    let start = performance.now()
    let r = await execute(fa_fibo(fa)??"fibo_fast", n??0)
    let end = performance.now()
    setFibostate({
      message: ""
      ,complete: true
      ,duration: end - start
    })
    setFiboN(n??0)
    setNums(r)
  }
  return(<>
    <Box component="form" onSubmit={handleSubmit(submit)}>
      <Controller control={control} name="d"
        rules={{
          required: "何か入れてね"
          ,validate: () => {
            let n = parseInt(getValues("d"))
            return 0 <= n && (n <= 10000 && (fa == "slow" && n <= 50 || fa != "slow"))
          }
        }}
        render={({field})=>(
          <TextField
            {...field}
            label={`fibonacci何回計算する？ (${fa})`}
            error={!!errors.d}
            helperText={errors.d && errors.d.message
            || !isValid && ((fa=="slow"?"50":"10000") + "以下の自然数を入力してください")
            }
          />
        )}
      />
    </Box>
    {fibostate.complete
    ?<Box padding={2}>
      <div>関数呼び出し回数 {nums[0]}回</div>
      <div>fibonacci[{fiboN}] = {nums[1]}</div>
      <div>{powerKetashori("round")(fibostate.duration, 3) }ms</div>
    </Box>
    : <Box>{fibostate.message}</Box>}
  </>)
}

export default Output