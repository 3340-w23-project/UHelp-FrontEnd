import React from "react";
import Head from "next/head";
import { AppConfig } from "@/utils/AppConfig";

const MetaTags = () => {
  return (
    <Head>
      <title>{`${AppConfig.siteName} - ${AppConfig.siteDescription}`}</title>
      <meta name="description" content={AppConfig.siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:image" content={AppConfig.siteLogo} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={AppConfig.siteName} />
      <meta name="twitter:description" content={AppConfig.siteDescription} />
      <meta name="twitter:image" content={AppConfig.siteLogo} />
      <meta name="twitter:image:alt" content={AppConfig.siteName} />
    </Head>
  );
};

export default MetaTags;
