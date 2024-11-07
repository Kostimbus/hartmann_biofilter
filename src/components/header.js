import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useIntl } from "gatsby-plugin-intl";
import "../styles/global.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const intl = useIntl();
  const locale = intl.locale !== "de" ? `/${intl.locale}` : "de";
  const locale_title_prefix = locale.charAt(0) == "/" ? locale.slice(1) : locale;

  const currentUrl = typeof window !== "undefined" ? window.location.pathname : "";

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

  return (
    <>
      <header class="z-3 header sticky-top">
        <nav id="desktop-nav" class="navbar navbar-expand-lg navbar-light pt-3">
          <div class="container-fluid align-middle" id="kkk">
            <div class="navbar-logo col-md-3 d-flex flex-wrap align-items-center justify-content-center">
              <a class="navbar-brand" href="/" title="Hartmann Biofilter GmbH & Co.KG">
                <span if="logo" class="inline-block">
                  <StaticImage
                    src="../images/branding.jpg"
                    alt="Hartmann Biofilter GmbH & Co.KG - Logo"
                    width={300}
                  />
                </span>
              </a>
            </div>
            <div class="collapse navbar-collapse col-md-6 d-flex flex-column" id="desktop-main-nav">
              <div class="flex-grow-1 d-flex align-items-center" id="desktop-navbar-list">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                  {data.allLinksJson.edges.map(({ node }, index) => (
                    <>
                      {node.subLinks ? (
                        <li class="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {node[`${locale_title_prefix}_title`]}
                          </Link>
                          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            {node.subLinks.map((subLink, subIndex) => (
                              <li key={subIndex}>
                                <Link className="dropdown-item" to={subLink.slug}>
                                  {subLink[`${locale_title_prefix}_title`]}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li class="nav-item">
                          <Link className="nav-link" to={node.slug}>
                            {node[`${locale_title_prefix}_title`]}
                          </Link>
                        </li>
                      )}
                    </>
                  ))}
                </ul>
              </div>
              <div class="container d-flex align-items-center" id="desktop-navbar-info">
                <ul class="d-flex flex-row-reverse">
                  <li>
                    <p>
                      <FontAwesomeIcon icon={faClock} /> Montag - Freitag: 08:00 - 17:00
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-md-1 offset-md-1 container align-items-end d-flex flex-column"
              id="desktop-navbar-lang-selector"
            >
              <div
                class="d-flex col-md-5 offset-md-5 flex-grow-1 align-items-center justify-content-center"
                id="lang"
              >
                <Link
                  className="nav-link lang_de"
                  to="/"
                  getProps={({ isCurrent }) =>
                    isCurrent ? { className: "nav-link active" } : null
                  }
                >
                  DE
                </Link>

                {/* <Link
                  className="nav-link"
                  to="/en"
                  getProps={({ isCurrent }) =>
                    isCurrent ? { className: "nav-link active" } : null
                  }
                >
                  EN
                </Link> */}
              </div>
              <div class="container d-flex align-items-center" id="qq"></div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
