import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" /> */}
        <title>Usahaku</title>
        <meta name="description" content="Deskripsi singkat situs kamu" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
