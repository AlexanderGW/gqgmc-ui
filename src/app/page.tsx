import Image from 'next/image'
import { Inter } from 'next/font/google'
// import styles from './page.module.scss'
import Chart from './Chart'
import * as React from 'react'

// import io from 'socket.io-client'
// let socket

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // React.useEffect(() => socketInitializer(), [])

  // const socketInitializer = async () => {
  //   await fetch('/api/socket')
  //   socket = io()

  //   socket.on('connect', () => {
  //     console.log('connected')
  //   })
  // }

  return (
    <main>
      <Chart />
    </main>
  )
}
