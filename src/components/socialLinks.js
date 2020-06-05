/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StaticQuery, graphql } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const sidebarSocial = {
  marginBottom: "20px",
  "@media screen and (min-width: 900px)" :{
      width: "40px",
      height: "40px"
  }
}

 const social = {
    display: "inline-block",
    width: "35px",
    height: "35px",
    verticalAlign: "middle",
    border: "1px solid $border-color",
    borderRadius: "50%",
    backgroundPosition: "50% 50%",
    backgroundSize: "40%",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
 }

 const setSocialIcon = (type) => {
    switch(type) {
      case "facebook":
        return <FontAwesomeIcon icon={faFacebook} />
      case "twitter":
        return <FontAwesomeIcon icon={faTwitter} />
      case "instagram":
        return <FontAwesomeIcon icon={faInstagram} />
      default:
        return null
    }
}

const SoicalLinks = () => {
    return (<StaticQuery
        query={graphql`
          query SocialQuery {
            allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
              edges {
                node {
                  profileType
                  url
                }
              }
            }
          }
        `}
        render={data => (
        <p css={sidebarSocial}>
        {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
      <a
        key={profile.profileType}
        href={profile.url}
        target="blank"
        css={social}
      >
        {setSocialIcon(profile.profileType.toLowerCase())}
        {profile.profileType.toLowerCase()}
      </a>
        ))}
    </p>)}
    />)
}

export default SoicalLinks;