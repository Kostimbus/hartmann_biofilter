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

  return <></>;
};

export default Footer;
