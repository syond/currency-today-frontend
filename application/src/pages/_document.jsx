import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-purple dark:bg-gray-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
