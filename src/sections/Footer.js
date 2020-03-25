/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby-link'
import Block from '../components/Block'
import Icon from '../components/Icon'
import Link from '../components/Link'
import Logo from '../components/Logo'
import OutboundLink from '../components/OutboundLink'

const year = new Date().getFullYear()

const Footer = ({ path, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      mobileBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 768, quality: 60) {
            src
          }
        }
      }
      desktopBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1024, quality: 60) {
            src
          }
        }
      }
      site {
        siteMetadata {
          title
          email
          social {
            facebook {
              url
            }
            instagram {
              url
            }
          }
        }
      }
    }
  `)
  const { mobileBg, desktopBg } = data
  const { title, email, social } = data.site.siteMetadata
  return (
    <footer sx={{
      backgroundBlendMode: 'color-burn',
      backgroundColor: 'black',
      backgroundImage: [`url(${mobileBg.childImageSharp.fluid.src})`, `url(${desktopBg.childImageSharp.fluid.src})`],
      color: 'white',
      mt: 0,
      px: 4,
      py: [9, 10],
      textAlign: ['center','left'],
    }}
    {...props}>
      <div sx={{
        variant: 'boxes.cell',
        }}>
      <div sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: ["wrap", "nowrap"],
        mx: -4,
      }}>
        <Block width={[1,1/2]}>
          <Link
            as={GatsbyLink}
            bare={true}
            to="/"
            from="footer"
            sx={{ display: 'inline-block' }}
          >
            <Logo
              fill="currentColor"
              sx={{
                cursor: 'pointer',
                color: 'primary',
                my: 0,
                textDecoration: 'none',
                transitionDuration: '0.25s',
                transitionProperty: 'opacity',
                transitionTimingFunction: 'ease-in-out',
                '&:hover': {
                  color: 'secondary'
                }
              }}
            />
          </Link>
          <p sx={{ fontSize: 1, fontFamily: 'sans', mt: 3 }}>{year} © {title}</p>
          <div sx={{
            justifyContent: ['center', 'flex-start'],
            display: 'flex',
            mt: 3,
            width: '100%',
          }}>
            {Object.keys(social).map((service, index) => {
              return (
                <Link 
                  key={service} 
                  as={OutboundLink} 
                  to={`https://www.${service}.com/${social[service].url}`} 
                  target="_blank" 
                  bare={true} 
                  sx={{
                    mr: 2,
                    '&:last-of-type': {
                      mr: 0
                    }
                  }}
                >
                  <Icon name={service}></Icon>
                </Link>
              )
            })}
          </div>
        </Block>
        <Block width={[1,1/2]}>
          <h2 sx={{ variant: 'styles.h6', color: 'white' }}>Contact Us</h2>
          <Link
            as={OutboundLink}
            title={`Send us an e-mail`}
            href={`mailto:${email}`}
            from={`footer`}
            target={`_blank`}
            sx={{
              variant: 'styles.links.link'
            }}
          >
            {email}
          </Link>
          <div sx={{ color: 'white', mt: 2 }}>
            825 16th St NW, 4th Floor, Washington, DC 20009 
          </div>
        </Block>
      </div>
      </div>
    </footer>
  )
}

export default Footer
