import Head from "next/head";
import Link from "next/link";
import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - SEO Tools</title>
        <meta name="description" content="Terms of Service for SEO Tools" />
      </Head>

      <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Terms of Service
        </h1>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          Effective date: February 8, 2026
        </p>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>1. Introduction</h2>
          <p>
            These Terms of Service govern your use of our website and services
            (the &quot;Service&quot;). By accessing or using the Service, you
            agree to be bound by these Terms. If you do not agree, do not use
            the Service.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>2. Acceptance of Terms</h2>
          <p>
            By using the Service, you represent that you have the legal capacity
            to enter into these Terms. We may update these Terms from time to
            time; continued use after changes constitutes acceptance.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>3. Use of the Service</h2>
          <p>
            You agree to use the Service in compliance with applicable laws and
            these Terms. You may not use the Service for unlawful activities or
            to infringe the rights of others.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>4. User Content</h2>
          <p>
            You retain ownership of content you submit, but grant us a limited
            license to use, reproduce, and display that content to provide the
            Service. You are responsible for the content you post.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>5. Prohibited Conduct</h2>
          <p>
            You must not: (a) interfere with the Service; (b) attempt to access
            other accounts; (c) submit malicious code; or (d) use the Service in
            a way that harms others.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>6. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding user content) are
            owned by us or our licensors and are protected by intellectual
            property laws. You may not copy or distribute our content without
            permission.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>7. Termination</h2>
          <p>
            We may suspend or terminate access to the Service for any reason,
            including violation of these Terms. Upon termination, your right to
            use the Service ends, but obligations and liabilities may survive.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>
            8. Disclaimers and Limitation of Liability
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties. To the
            fullest extent permitted by law, we disclaim all warranties and are
            not liable for indirect, incidental, or consequential damages.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the applicable jurisdiction
            without regard to conflict of law rules. Disputes will be subject to
            the courts located in that jurisdiction unless otherwise required by
            law.
          </p>
        </section>

        <section style={{ marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>10. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. We will provide notice of
            material changes, and continued use after notice constitutes
            acceptance of the updated Terms.
          </p>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem" }}>11. Contact Us</h2>
          <p>
            For questions about these Terms, contact us at
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

export default TermsOfService;
