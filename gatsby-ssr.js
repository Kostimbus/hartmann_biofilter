/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */

import React from "react";

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` });
  setHeadComponents([
    <link
      key="roboto"
      rel="preload"
      href="/fonts/Roboto/Roboto-Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="roboto-medium"
      rel="preload"
      href="/fonts/Roboto/Roboto-Medium.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="roboto-light"
      rel="preload"
      href="/fonts/Roboto/Roboto-Light.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="roboto-black"
      rel="preload"
      href="/fonts/Roboto/Roboto-Black.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="manrope"
      rel="preload"
      href="/fonts/Manrope/Manrope-ExtraLight.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="manrope"
      rel="preload"
      href="/fonts/Manrope/Manrope-SemiBold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="ibm-plex-sans"
      rel="preload"
      href="/fonts/IBM_Plex_Sans/IBMPlexSans-SemiBoldItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
  ]);
};
