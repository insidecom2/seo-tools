import Login from "@/src/components/login";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Optimus Sync</title>
        <meta name="description" content="Login to Optimus Sync" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="vh-100" style={{ backgroundColor: "#EEE" }}>
        <Login />
      </div>
    </>
  );
}
