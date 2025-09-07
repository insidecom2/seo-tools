import Login from "@/src/components/login";
import Head from "next/head";

import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(true);
  return (
    <div className="vh-100" style={{ backgroundColor: "#EEE" }}>
      <Head>
        <title>Login In</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  );
}
