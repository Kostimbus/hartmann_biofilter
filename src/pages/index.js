import * as React from "react";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useIntl } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";

import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../components/index.module.css";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allLinksJson {
        edges {
          node {
            id
            slug
            en_title
            de_title
            subLinks {
              slug
              de_title
              en_title
            }
          }
        }
      }
    }
  `);

  const filteredSubLinks = data.allLinksJson.edges
    .filter(({ node }) => node.slug === "/areas-of-application")
    .flatMap(({ node }) => node.subLinks || []);

  const imagePaths = [
    "../images/industrie.jpg",
    "../images/landwirtschaft.jpg",
    "../images/lebensmittelindustrie.jpg",
    "../images/recycling.jpg",
  ];

  const intl = useIntl();
  const locale = intl.locale !== "de" ? `/${intl.locale}` : "de";
  const locale_title_prefix = locale.charAt(0) == "/" ? locale.slice(1) : locale;

  return (
    <Layout>
      <div class="herosection-wrapper">
        <div class="over-herosection-claim-wrapper col-md-5">
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
      </div>

      <div class="d-flex container-fluid branches" id="branches-container">
        <div class="container-fluid justify-content-start">
          <p class="content-title">
            <FormattedMessage id="teaser" defaultMessage={"Überall verwenden"} />
          </p>
          <div class="flex-row container-fluid d-flex" id="branches-row">
            {/* {filteredSubLinks.map((subLink, index) => (
              <div key={index} class="branch-card col-md-3">
                <Link to={subLink.slug}>
                  <StaticImage src={`../images/Industry.jpg`} alt="Image" width={1500} />
                  <div class="branch-title">{subLink[`${locale_title_prefix}_title`]}</div>
                </Link>
              </div>
            ))} */}

            <div class="branch-card col">
              <Link to={filteredSubLinks[0].slug}>
                <StaticImage src={`../images/industrie.jpg`} alt="Image" width={1500} />
                <div class="branch-title">
                  {filteredSubLinks[0][`${locale_title_prefix}_title`]}
                </div>
              </Link>
            </div>

            <div class="branch-card col">
              <Link to={filteredSubLinks[1].slug}>
                <StaticImage src={`../images/landwirtschaft.jpg`} alt="Image" width={1500} />
                <div class="branch-title">
                  {filteredSubLinks[1][`${locale_title_prefix}_title`]}
                </div>
              </Link>
            </div>

            <div class="branch-card col">
              <Link to={filteredSubLinks[2].slug}>
                <StaticImage src={`../images/lebensmittelindustrie.jpg`} alt="Image" width={1500} />
                <div class="branch-title">
                  {filteredSubLinks[2][`${locale_title_prefix}_title`]}
                </div>
              </Link>
            </div>

            <div class="branch-card col">
              <Link to={filteredSubLinks[3].slug}>
                <StaticImage src={`../images/recycling.jpg`} alt="Image" width={1500} />
                <div class="branch-title">
                  {filteredSubLinks[3][`${locale_title_prefix}_title`]}
                </div>
              </Link>
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
