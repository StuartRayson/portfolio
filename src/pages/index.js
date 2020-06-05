/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import Splash from "../components/splash"

const card = {
  boxShadow: "0 0 5px #ccc",
  '&:hover': {
    color: 'lightgreen'
  }
}

const cardImage = {
  display: "block",
  position: "relative",
  "img": {
    display: 'block'
  },
  "&:before, &:after":{
    position: "absolute",
    zIndex: 1,
    content: "",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out"
  },
  "&:before": {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(white, 0.7)"
  },
  "&:after": {
    width: "80px",
    height: "80px",
    background: "url('https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-magnifying-glass.svg')",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    top: "50%",
    left: "50%",
    marginLeft: "-40px",
    marginTop: "-40px",
  },
  "&:hover": {
    "&:before": {
      opacity: 1
    },
    "&:after":{
      opacity: .5
    }
  }
}

const cardCaption = {
  backgroundColor: "white",
  padding: "20px" 
}

const cardTitle = {
  marginBottom: "10px",
  "a": {
    textTransform: "uppercase",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    color: "$dark-body-color",
    "&:hover": {
      borderBottom: "dotted 1px #9055a2"
    }
  }
}

const cardDescription = {
  color: "$light-body-color",
  fontSize: "14px",
  lineHeight: "1.4",
}


const IndexPage = ({ data }) => (
    <Layout>
      <Splash />
      <Masonry className="showcase">
        {data.allDatoCmsWork.edges.map(({ node: work }) => (
          <div key={work.id} className="showcase__item">
            <figure css={card}>
              <Link to={`/works/${work.slug}`} css={cardImage}>
                <Img fluid={work.coverImage.fluid} />
              </Link>
              <figcaption css={cardCaption}>
                <h6 css={cardTitle}>
                  <Link to={`/works/${work.slug}`}>{work.title}</Link>
                </h6>
                <div css={cardDescription}>
                  <p>{work.excerpt}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>
    </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
