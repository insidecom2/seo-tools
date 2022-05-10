import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react';

export default function Home() {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Login In</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
