/** @jsx jsx */
import { jsx } from '@emotion/core'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from "../components/layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faJs, faHtml5, faCss3 } from '@fortawesome/free-brands-svg-icons'

const styles = {
  box: {
    display: "flex",
    margin: "0 0 65px 0"
  },
  col_left: {
    flexBasis: "34%"
  },
  col_right: {
    flexBasis: "67%" 
  },
  skill_item: {
    fontSize: "1.2rem"
  },
  title: {
    fontFamily: "Space Mono",
    fontSize: "2.5rem",
    margin: "0"
  }
}

const mapIcons = icon => {
  console.log(icon)
  switch (icon) {
    case "react":
      return <FontAwesomeIcon icon={faReact} />
    case "js":
      return <FontAwesomeIcon icon={faJs} />
    case "html":
      return <FontAwesomeIcon icon={faHtml5} />
    case "css":
      return <FontAwesomeIcon icon={faCss3} />
    default: 
      return null
  }
}

const About = ({ data: { about } }) => (
  <Layout>
    <article>
      <HelmetDatoCms seo={about.seoMetaTags} />
      <div>
        <div css={styles.box}>
        <div css={styles.col_left}>
          <h1 css={styles.title}>{about.title}</h1>
        </div>
        <div css={styles.col_right}>
          <div dangerouslySetInnerHTML={{
            __html: about.bioNode.childMarkdownRemark.html,
          }} />
          {/* <div>
            <Img fluid={about.photo.fluid} />
          </div> */}
          </div>
        </div>
        <div css={styles.box}>
          <div css={styles.col_left}>
            <h2 css={styles.title}>Skills</h2>
            <i>Stuff I've googled alot</i>
          </div>
          <div css={styles.col_right}>
            <ul>
              {about.skills && about.skills.core.map(skill => <li css={styles.skill_item}>{mapIcons(skill.icon)} {skill.title}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      skills
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
