// src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { NextPage } from "next";

// Tipe kustom untuk Page Component yang dapat memiliki getLayout
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

// Tipe kustom untuk AppProps yang menggunakan NextPageWithLayout
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Cek apakah Component (halaman) memiliki fungsi getLayout
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" />
        {/* ... (link font lainnya) ... */}
        <title>Usahaku</title>
        <meta name="description" content="Deskripsi singkat situs kamu" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Terapkan layout yang ditemukan, jika ada. */}
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}