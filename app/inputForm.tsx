"use client";
import { inputAtom, tempListAtom } from "@/ts/jotai";
import { Box, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

type Input = {
  s: string
}
const emptyInput: Input = {
  s: ""
}
const InputForm: FC = () => {
  const {getValues, control, watch, handleSubmit } = useForm<Input>({
    defaultValues: emptyInput
  })
  const [inputatom, setInputatom] = useAtom(inputAtom)
  const [temps, setTemps] = useAtom(tempListAtom)
  const watchS = watch("s")
  useEffect(()=>{
    const subsc = watch(({s}) => {
      if (s !== undefined) setInputatom(s)
    })
    return () => subsc.unsubscribe()
  }, [watch])
  const submit = (f: Input) => {
    setTemps([f.s, ...temps])
  }

  return(
  <Box
    component={"form"}
    onSubmit={handleSubmit(submit)}
    maxWidth={1000}>
    <Controller
      control={control}
      name="s"
      render={({field: {onChange,}, formState, fieldState})=>(
        <TextField
          label="Ithkuil script"
          fullWidth
          onChange={onChange}
        />
      )}
    />
    <p>s: {watchS}</p>
  </Box>)
}

export default InputForm