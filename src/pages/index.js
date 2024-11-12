import * as React from "react";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useIntl } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";
import { getImage } from "gatsby-plugin-image";
import TextImage from "../components/mdx_sections/textImage.js";

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
      allMdx {
        nodes {
          body
          frontmatter {
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  transformOptions: { fit: COVER, cropFocus: CENTER }
                  height: 1000
                  width: 2000
                  aspectRatio: 2
                  quality: 50
                )
              }
            }
            lang
            name
            title
            order
            lang
          }
        }
      }
    }
  `);

  const filteredSubLinks = data.allLinksJson.edges
    .filter(({ node }) => node.slug === "/areas-of-application")
    .flatMap(({ node }) => node.subLinks || []);

  const mdxData = data.allMdx.nodes.reduce((acc, node) => {
    const { name } = node.frontmatter;
    acc[name] = node;
    return acc;
  }, {});

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
        <div class="over-herosection-claim-wrapper col-md-5 d-flex align-items-center">
          <div class="d-flex claims">
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
      <div class="d-flex container-fluid" id="branches-container">
        <div class="container-fluid justify-content-start branches">
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
      <div class="main-container">
        <TextImage
          id="main_content"
          text={mdxData.main_content.body}
          image={getImage(mdxData.main_content.frontmatter.image)}
          title={mdxData.main_content.frontmatter.title}
        />
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
