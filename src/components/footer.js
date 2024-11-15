import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";
import "../styles/global.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faAddressCard, faTimes } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const intl = useIntl();
  const locale = intl.locale !== "de" ? `/${intl.locale}` : "de";
  const locale_title_prefix = locale.charAt(0) == "/" ? locale.slice(1) : locale;

  const currentUrl = typeof window !== "undefined" ? window.location.pathname : "";

  const data = useStaticQuery(graphql`
    {
      allFooterLinksJson {
        edges {
          node {
            id
            slug
            en_title
            de_title
          }
        }
      }
    }
  `);

  return (
    <>
      <footer class="footer">
        <nav
          id="desktop-nav-footer"
          class="navbar navbar-expand-lg navbar-light justify-content-center align-items-center"
        >
          <div class="col-md-6 container-fluid d-flex flex-column align-middle align-items-center">
            <ul class="navbar-nav mb-lg-0 d-flex justify-content-around w-100 align-items-center align-middle">
              {data.allFooterLinksJson.edges.map(({ node }, index) => (
                <>
                  <li class="nav-item">
                    <Link className="nav-link" to={node.slug}>
                      {node[`${locale_title_prefix}_title`]}
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
