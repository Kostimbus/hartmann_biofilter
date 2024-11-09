import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useIntl } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../components/index.module.css";

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
];

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description: "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
];

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
];

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`;

const IndexPage = () => {
  const intl = useIntl();
  const locale = intl.locale !== "de" ? `/${intl.locale}` : "de";

  return (
    <Layout>
      <div class="herosection-wrapper"></div>
      <div class="over-herosection-wrapper col-md-5">
        <div class="d-flex claims align-items-center">
          <p class="col-md-12" id="main-claim">
            <FormattedMessage id="slogan" defaultMessage={"Innovative Lösungen"} />
          </p>
          <p class="col-md-12" id="sub-claim">
            <FormattedMessage
              id="second_slogan"
              defaultMessage={"Der einzige Biofilter, der hält, was er verspricht!"}
            />
          </p>
        </div>
      </div>
      <div class="d-flex container-fluid branches" id="branches-container">
        <div class="container-fluid branches-row">
          <h2>Überall verwenden</h2>
          <div class="flex-row">
            <div class="container-fluid d-flex flex-row">
              <div class="col-md-3">
                <StaticImage
                  src="../images/branding.jpg"
                  alt="Hartmann Biofilter GmbH & Co.KG - Logo"
                  width={200}
                />
              </div>
              <div class="col-md-3">
                <StaticImage
                  src="../images/branding.jpg"
                  alt="Hartmann Biofilter GmbH & Co.KG - Logo"
                  width={200}
                />
              </div>
              <div class="col-md-3">
                <StaticImage
                  src="../images/branding.jpg"
                  alt="Hartmann Biofilter GmbH & Co.KG - Logo"
                  width={200}
                />
              </div>
              <div class="col-md-3">
                <StaticImage
                  src="../images/branding.jpg"
                  alt="Hartmann Biofilter GmbH & Co.KG - Logo"
                  width={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
