/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
/** @jsx jsx */
import { jsx, Global } from '@emotion/core'
import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import SoicalLinks from "../components/socialLinks"

const styles = {
  container: {
    maxWidth: "1440px",
    padding: "0 65px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "40px 0 40px",
    fontFamily: "Space Mono",
    width: "100%",
    alignItems: "center"
  },
  logo: {
    "a": {
      textDecoration: "none",
      fontSize: "3.5rem"
    }
  },
  nav: {
    display: "none",
    "@media screen and (min-width: 900px)" :{
      display: "block"
    },
    "a": {
      fontSize: "1.5rem",
      margin: "0px 0px 0px 40px",
      textDecoration: "none",
      position: "relative",
      display: "inline-block",

      "&:before": {
        display: "none",
        content: "''",
        position: "absolute",
        height: "2px",
        width: "100%",
        top: "110%",
        left: "0",
        backgroundColor: "black",
        "@media (prefers-color-scheme: dark)": {
          backgroundColor: "white"
        }
      },
      "&[aria-current='page']:before": {
        display: "block"
      },
      "&:hover:before": {
        display: "block"
      }
    }
  },
  activeLink: {
    "&:before": {
      display: "block"
    }
  },
  mobileHeader: {
    display: "block",
    "@media screen and (min-width: 900px)" :{
      display: "none"
    }
  },
  mobileMenu: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    "@media screen and (min-width: 900px)" :{
      display: "none !important" 
    }
  }
}

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Fragment>
    <Global
      styles={{
        html: {
          fontSize: "100%",
          padding: 0,
          margin: 0
        },
        body: {
          background: "#f0f0f0",
          fontFamily: "Montserrat",
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          maxWidth: '100vw',
          color: "black",
          "a": {
            color: "black"
          },
          "@media (prefers-color-scheme: dark)": {
            background: "#1c1c1c",
            color: "white",
            "a": {
              color: "white"
            }
          }
        }
      }}
    />
    <div css={[styles.mobileMenu, { display: showMenu ? "block" : "none" }]}>
      <button
          onClick={e => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
        />
      Menu
    </div>
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            copyright
          }
        }
      `}
      render={data => (
        <div css={styles.container}>
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div css={styles.header}>
            <div css={styles.header}>
              <h6 css={styles.logo}>
                <Link to="/">{"[SR]"}</Link>
              </h6>
              <nav css={styles.nav}>
                <Link to="/" activeStyle={styles.activeLink}>Experience</Link>
                <Link to="/about" activeStyle={styles.activeLink}>About</Link>
              </nav>
              <div css={styles.mobileHeader}>
                <div>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <main>
            {children}
            </main>
            <div>
              <div>
                <SoicalLinks />
              </div>
              <div>
                {data.datoCmsHome.copyright}
              </div>
            </div>
          </div>
        </div>
      )}
    />
    </Fragment>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
