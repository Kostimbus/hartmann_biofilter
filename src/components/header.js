import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useIntl } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";
import "../styles/global.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope, faAddressCard, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const intl = useIntl();
  const locale = intl.locale !== "de" ? `/${intl.locale}` : "de";
  const locale_title_prefix = locale.charAt(0) == "/" ? locale.slice(1) : locale;

  const [selectedSubLinks, setSelectedSubLinks] = React.useState([]);
  const [scrolled, setScrolled] = React.useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentUrl = typeof window !== "undefined" ? window.location.pathname : "";

  const data = useStaticQuery(graphql`
    {
      allHeaderLinksJson {
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
        <nav
          id="desktop-nav"
          class={`d-none d-md-flex navbar navbar-expand-lg navbar-light pt-3 ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <div class="container-fluid align-middle" id="kkk">
            <div class="navbar-logo col-md-3 d-flex flex-wrap align-items-center justify-content-center">
              <a class="navbar-brand" href="/" title="Hartmann Biofilter GmbH & Co.KG">
                <span if="logo" class="inline-block">
                  <StaticImage
                    src="../images/branding.jpg"
                    alt="Hartmann Biofilter GmbH & Co.KG - Logo"
                    width={400}
                  />
                </span>
              </a>
            </div>
            <div class="collapse navbar-collapse col-md-6 d-flex flex-column" id="desktop-main-nav">
              <div
                class="flex-grow-1 d-flex align-items-center container-fluid col-md-12"
                id="desktop-navbar-list"
              >
                <ul class="navbar-nav mb-lg-0 d-flex justify-content-around w-100">
                  {data.allHeaderLinksJson.edges.map(({ node }, index) => (
                    <>
                      <React.Fragment key={index}>
                        {node.subLinks ? (
                          <li class="nav-item dropdown">
                            <Link
                              className="nav-link dropdown-toggle"
                              activeClassName="active-link"
                              partiallyActive={true}
                              to={node.slug}
                              id="navbarDropdown"
                              role="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedSubLinks(node.subLinks);
                              }}
                              aria-expanded="false"
                            >
                              {node[`${locale_title_prefix}_title`]}
                            </Link>
                          </li>
                        ) : (
                          <li class="nav-item">
                            <Link className="nav-link" activeClassName="active-link" to={node.slug}>
                              {node[`${locale_title_prefix}_title`]}
                            </Link>
                          </li>
                        )}
                      </React.Fragment>
                    </>
                  ))}
                </ul>
              </div>
              <div class="container-fluid d-flex col-md-12" id="desktop-navbar-info">
                <ul class="d-flex flex-row align-items-center justify-content-start w-100">
                  {selectedSubLinks.length > 0 ? (
                    <>
                      {selectedSubLinks.map((subLink, subIndex) => (
                        <li key={subIndex}>
                          <Link className="dropdown-item" to={subLink.slug}>
                            {subLink[`${locale_title_prefix}_title`]}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => setSelectedSubLinks([])}
                          className="btn btn-link ms-2"
                          aria-label="Close submenu"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <p>
                          <span>
                            <FontAwesomeIcon icon={faClock} />
                          </span>
                          <FormattedMessage
                            id="working_hours"
                            defaultMessage={"Montag - Freitag: 08:00 - 17:00"}
                          />
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <Link to="mailto: info@hartmann-filter.de">info@hartmann-filter.de</Link>
                        </p>
                      </li>
                      <li>
                        <p>
                          <span>
                            <FontAwesomeIcon icon={faAddressCard} />
                          </span>
                          +49 (0) 5295 1569
                        </p>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div
              class="col-md-1 offset-md-1 container align-items-end d-flex flex-column"
              id="desktop-navbar-lang-selector"
            >
              <div
                class="d-flex col-md-5 flex-grow-1 align-items-center justify-content-center"
                id="lang"
              >
                <Link
                  className="nav-link"
                  to={locale_title_prefix == "de" ? "/en" : "/"}
                  getProps={({ isCurrent }) =>
                    isCurrent ? { className: "nav-link active" } : null
                  }
                >
                  {locale_title_prefix == "de" ? "EN" : "DE"}
                </Link>
              </div>
              <div
                class="d-flex col-md-5 flex-grow-1 align-items-center justify-content-center"
                id="utility_lang_div"
              ></div>
            </div>
          </div>
        </nav>
        <nav id="mobile-nav" class="d-flex d-md-none justify-content-around">
          <div class="tile">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div class="tile">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div class="tile">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div class="tile">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div class="tile" onClick={toggleSubmenu}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </nav>

        {isSubmenuOpen && (
          <div class="submenu-overlay">
            <button class="close-btn" onClick={toggleSubmenu}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div class="submenu-content">
              <h2>SUKA</h2>
              <p> PIDOR </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
