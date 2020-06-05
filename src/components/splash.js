import React from 'react'
import { StaticQuery, graphql } from "gatsby";

const styles = {
  container: {
    height: "100vh",
    fontSize: "2rem"
  },
  intro: {
    fontFamily: "Space Mono",
    margin: 0
  },
  introCaption: {
    marginTop: "-15px"
  }
}

const Splash = () => {
  return (
    <StaticQuery query={graphql`
    query SplashQuery {
      datoCmsHome {
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `} render={data => (
    <div css={styles.container}>
      <h2 css={styles.intro}>Hi I'm Stuart</h2>
      <div css={styles.introCaption}
        dangerouslySetInnerHTML={{
          __html:
            data.datoCmsHome.introTextNode.childMarkdownRemark.html
        }}
      />
    </div>
  )}/>
  )
}

export default Splash