/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby-link'
import Block from './Block'
import Icon from './Icon'
import Link from './Link'
import Logo from './Logo'
import OutboundLink from './OutboundLink'

const year = new Date().getFullYear()

const Footer = ({ path, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
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
  const { title, email, social } = data.site.siteMetadata
  const isHome = path === '/' ? 1 : 0
  return (
    <footer sx={{
      backgroundColor: 'black',
      color: 'white',
      mt: isHome ? 0 : [7,8,9],
      px: [4,3],
      py: [6, 9],
      textAlign: ['center','left'],
    }}
    {...props}>
      <div sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: ["wrap", "nowrap"],
        mx: -4,
        variant: 'boxes.cell',
      }}>
        <Block width={[1,1/2]}>
          <Link
            as={GatsbyLink}
            bare={true}
            to="/"
            from="footer"
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
            alignItems: 'center',
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
        </Block>
      </div>
    </footer>
  )
}

export default Footer
