import Head from "next/head";
import Link from "next/link";

import ThemeToggle from "@/src/components/theme-toggle";

export default function Home() {
  return (
    <>
      <Head>
        <title>Optimus Sync - sync video youtube</title>
        <meta name="description" content="Landing page" />
        <meta
          name="google-site-verification"
          content="iH1_k24U67qVruYsapwDoVPXHmipyzxngijggGUEAtU"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 24, right: 24 }}>
          <ThemeToggle />
        </div>
        <section
          style={{
            width: "100%",
            maxWidth: 760,
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            padding: "2rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
            Optimus Sync
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            This application support core SEO reporting and tracking features.
            Use the links below to review our policy and sign in.
          </p>

          <ul
            style={{
              marginBottom: "1.5rem",
              paddingLeft: "1.2rem",
              lineHeight: 1.7,
            }}
          >
            <li>Secure authentication for authorized users.</li>
            <li>Data access is limited to required app functionality.</li>
            <li>Clear privacy policy and terms for compliance review.</li>
          </ul>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/login">
              <a
                style={{
                  display: "inline-block",
                  padding: "0.65rem 1rem",
                  borderRadius: 8,
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Go to Login
              </a>
            </Link>

            <Link href="/policy-privacy">
              <a
                style={{
                  display: "inline-block",
                  padding: "0.65rem 1rem",
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Privacy Policy
              </a>
            </Link>

            <Link href="/terms-of-service">
              <a
                style={{
                  display: "inline-block",
                  padding: "0.65rem 1rem",
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Terms of Service
              </a>
            </Link>
          </div>

          <footer
            style={{
              marginTop: "1.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid hsl(var(--border))",
              fontSize: "0.95rem",
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.7,
            }}
          >
            <div>
              Contact Us Email:{" "}
              <a
                href="mailto:lumsumsolution@gmail.com"
                style={{ color: "hsl(var(--primary))", textDecoration: "none" }}
              >
                lumsumsolution@gmail.com
              </a>
            </div>
            <div>
              Tel:{" "}
              <a
                href="tel:+660909442826"
                style={{ color: "hsl(var(--primary))", textDecoration: "none" }}
              >
                +660909442826
              </a>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
