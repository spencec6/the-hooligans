/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { Link as GatsbyLink, navigate } from 'gatsby-link'
import Block from '../components/Block'
import Button from '../components/Button'
import Link from '../components/Link'
import Logo from "-!svg-react-loader!../images/SVGs/TheHooligans-Logo.inline.svg";
import SocialMedia from '../components/SocialMedia'
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
        }
      }
      contentfulGlobalInformation {
        address
      }
    }
  `)
  const { mobileBg, desktopBg } = data
  const { title, email } = data.site.siteMetadata
  const { address } = data.contentfulGlobalInformation
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
              onClick={(e) => { navigate('/#header')}}
              sx={{
                cursor: 'pointer',
                color: 'primary',
                height: '65px',
                my: 0,
                textDecoration: 'none',
                transitionDuration: '0.25s',
                transitionProperty: 'opacity',
                transitionTimingFunction: 'ease-in-out',
                width: '160px',
                '&:hover': {
                  color: 'secondary'
                }
              }}
            />
          </Link>
          <p sx={{ fontSize: 1, fontFamily: 'sans', mt: 3 }}>{year} © {title}</p>
          {/* <p
            sx={{ color: 'greys.500', fontSize: 0, fontFamily: 'sans', mt: 2, }}
          >
            Website by 
            <Link
              as={OutboundLink}
              to="https://www.dribbble.com/colinspencedesign"
              from="footer"
              target="_blank"
              bare={1}
              sx={{ color: 'teal', ml: 1, textTransform: 'uppercase' }}
            >
              Colin Spence Design
            </Link>
            <div sx={{ fontSize: 0, fontFamily: 'cursive',}}> ( from Canada )</div>
          </p> */}
          <SocialMedia sx={{ mt: 4}}/>
        </Block>
        <Block width={[1,1/2]}>
          <h2 sx={{ variant: 'styles.h6', fontFamily: 'cursive', textTransform: 'lowercase', color: 'white' }}>
            Contact Information
          </h2>
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
          <div sx={{ color: 'white', fontFamily: 'sans', mt: 2 }}>
            {address}
          </div>
          <Button
            as={GatsbyLink}
            to="/contact#header"
            from="footer"
            onClick={() => { navigate('/contact') }}
            sx={{ variant: 'buttons.secondary', mt: 3, px: 4, py: 2, }}
          >
            Contact Us
          </Button>
        </Block>
      </div>
      </div>
    </footer>
  )
}

export default Footer
