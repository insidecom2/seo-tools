import Head from "next/head";
import Link from "next/link";
import React from "react";

const PolicyPrivacy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Optimus Sync</title>
        <meta name="description" content="Privacy Policy for Optimus Sync" />
      </Head>

      <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Effective date: February 8, 2026
        </p>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>1. Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, and share
            information when you use our website and services (collectively, the
            &quot;Service&quot;). By using the Service, you agree to the
            collection and use of information in accordance with this policy.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>2. Information We Collect</h2>
          <p>
            We collect information you provide directly (for example, when you
            contact us or register) and information collected automatically
            (such as usage data, cookies, and analytics). We may also collect
            aggregated or anonymized data.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>3. How We Use Information</h2>
          <p>
            We use information to provide, maintain, and improve the Service, to
            communicate with you, and to personalize content. We may also use
            information for security, analytics, and legal compliance.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to collect information about
            usage and to provide certain features. You can control cookie
            preferences through your browser settings; note that disabling
            cookies may affect functionality.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>5. Third-Party Services</h2>
          <p>
            We may share information with third-party service providers who
            perform services on our behalf (such as analytics or hosting). Those
            providers are bound by privacy obligations and may not use your data
            for other purposes.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>6. Data Security</h2>
          <p>
            We implement reasonable administrative and technical safeguards to
            protect your information. However, no system is completely secure;
            we cannot guarantee absolute security of data.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>7. Your Choices</h2>
          <p>
            You may review, update, or delete certain information you provided
            by contacting us. You can opt out of some communications and
            marketing messages.
          </p>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>8. Contact Us</h2>
          <p>
            If you have questions about this policy or our practices, please
            contact us at
            <a href="mailto:support@example.com"> support@example.com</a>.
          </p>
        </section>

        <div>
          <Link href="/">
            <a style={{ color: "#0366d6" }}>Return to home</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PolicyPrivacy;
