import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import InputForm from './inputForm'
import Output from './output'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <InputForm />
      <Output />
    </>
  )
}
