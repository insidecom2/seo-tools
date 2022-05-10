import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { useState } from 'react';
import { Card, Col, Container, Form, Row , Button } from 'react-bootstrap';
import Login from '../components/login';

export default function Home() {
  const [show, setShow] = useState(true);
  return (
	  <div className='vh-100' style={{ backgroundColor: '#EEE' }}>
		  <Head>
			  <title>Login In</title>
			  <meta name="description" content="Login" />
			  <link rel="icon" href="/favicon.ico" />
		  </Head>
		  <Login />
	  </div>
  )
}
