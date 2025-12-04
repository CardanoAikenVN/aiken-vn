import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import LandingPage from '@site/src/components/LandingPage';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      noFooter
      title="Aiken VN - Vietnamese Aiken Learning Resource"
      description="The first open-source Vietnamese curriculum helping developers master Aiken and smart contracts on Cardano">
      <LandingPage />
    </Layout>
  );
}
