import Head from 'next/head'

import Layout from '@/components/layout';

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Currency Today</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
