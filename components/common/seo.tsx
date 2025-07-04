// import Head from "next/head";

import React from "react";

interface SeoProps {
  pageTitle?: string;
  font?: string;
}

const Seo: React.FC<SeoProps> = ({ pageTitle, font }) => (
  <>
    {/*
    <Head>
      <title>
        {pageTitle && `${pageTitle} || IKASOWi - Real Estate}`}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="keywords"
        content="advanced custom search, agency, agent, business, clean, corporate, directory, google maps, homes, idx agent, listing properties, membership packages, property, real broker, real estate, real estate agent, real estate agency, realtor"
      />
      <meta
        name="description"
        content="IKASOWi - Real Estate"
      />
      <meta name="ibthemes" content="ATFN" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {font && <link href={font} rel="stylesheet" />}
      <link rel="icon" href="favicon.ico" />
    </Head>
    */}
  </>
);

export default Seo;
