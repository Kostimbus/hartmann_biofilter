import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import "../styles/global.scss";

const Header = () => {
  const currentUrl = typeof window !== "undefined" ? window.location.pathname : "";

  const data = useStaticQuery(graphql`
    {
      allLinksJson {
        edges {
          node {
            id
            slug
            title
            subLinks {
              slug
              title
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <header class="position-relative z-3 header">
        <nav id="desktop-nav" class="navbar navbar-expand-lg navbar-light sticky-top pt-3">
          <div class="container-fluid align-middle" id="kkk">
            <div class="navbar-logo col-md-3 d-flex flex-wrap align-items-center">
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
            <div class="col-md-3">
              <p></p>
            </div>
            <div class="collapse navbar-collapse col-md-6" id="desktop-navbar-list">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                {data.allLinksJson.edges.map(({ node }, index) => (
                  <>
                    {node.subLinks ? (
                      <li class="nav-item dropdown">
                        <Link
                          class="nav-link dropdown-toggle"
                          to="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {node.title}
                        </Link>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          {node.subLinks.map((subLink, subIndex) => (
                            <li key={subIndex}>
                              <Link class="dropdown-item" to={subLink.slug}>
                                {subLink.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li class="nav-item">
                        <a class="nav-link active" href={node.slug}>
                          {node.title}
                        </a>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
