/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import { GrFacebook, GrInstagram, GrLinkedin, GrPinterest, GrTwitter } from 'react-icons/gr'

export default function SocialMedia({...props}) {
  const data = useStaticQuery(graphql`
    query SocialMediaQuery {
      site {
        siteMetadata {
          social {
            facebook {
              url
            }
            twitter {
              url
            }
            instagram {
              url
            }
            linkedin {
              url
            }
            pinterest {
              url
            }
          }
        }
      }
    }
  `)
  const { social } = data.site.siteMetadata
  const socialMediaIcons = {
    facebook: <GrFacebook/>,
    instagram: <GrInstagram/>,
    linkedin: <GrLinkedin/>,
    pinterest: <GrPinterest/>,
    twitter: <GrTwitter/>,
  }
  return (
    <div sx={{
      alignItems: 'center',
      justifyContent: ['center', 'center', 'flex-start'],
      display: 'flex',
      width: '100%',
      }}
      {...props}
    >
      {Object.keys(social).map((service, index) => {
        return (
          <Link 
            key={service} 
            aria-label={service}
            as={OutboundLink} 
            to={social[service].url}
            target="_blank" 
            bare={true} 
            sx={{
              mr: 3,
              '&:last-of-type': {
                mr: 0
              }
            }}
          >
            {socialMediaIcons[service]}
          </Link>
        )
      })}
    </div>
  )
}