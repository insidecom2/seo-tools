import Login from "@/src/components/login";
import ThemeToggle from "@/src/components/theme-toggle";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Optimus Sync</title>
        <meta name="description" content="Login to Optimus Sync" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="vh-100"
        style={{ backgroundColor: 'hsl(var(--background))', position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
          <ThemeToggle />
        </div>
        <Login />
      </div>
    </>
  );
}
