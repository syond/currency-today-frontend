import { Html, Head, Main, NextScript } from 'next/document'

import Layout from '@/components/Layout'
 
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Currency Now</title>
      </Head>
      <body className="bg-purple">
        <Layout>
          <Main />
        </Layout>
        <NextScript />
      </body>
    </Html>
  )
}