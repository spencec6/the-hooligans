/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import { GlitchRotate } from '../components/Animations'
import Button from '../components/Button'
import Hamburger from '../components/Hamburger'
import Icon from '../components/Icon'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import Logo from "-!svg-react-loader!../images/SVGs/TheHooligans-Logo.inline.svg";
import LinkSmearYellow from '../images/SVGs/LinkSmearYellow.svg'
import MobileHeader from '../components/MobileHeader'
import { randomize } from '../utils/helpers'

function Header({path}) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            facebook {
              url
            }
            instagram {
              url
            }
            twitter {
              url
            }
          }
        }
      }
      menu: allContentfulMenu {
        nodes {
          menuItem {
            ... on ContentfulAbout {
              main
              slug
              title
            }
            ... on ContentfulPortfolio {
              main
              slug
              title
            }
            ... on ContentfulServices {
              main
              slug
              title
            }
            ... on ContentfulRepresentationPage {
              main
              slug
              title
            }
            ... on ContentfulContactPage {
              main
              slug
              title
            }
          }
        }
      }
    }
  `)
  const social = data.site.siteMetadata.social

  const mainMenuItems = []
  mainMenuItems.push({main: 'logo', slug: '', title: 'Home'})
  data.menu.nodes[0].menuItem.forEach((menuItem, index) => {
    mainMenuItems.push({main: menuItem.main, slug: menuItem.slug, title: menuItem.title })
  })

  const [isOpen, setIsOpen] = useState(0); 

  const isHome = path === '/' ? 1 : 0
  return (
    <header sx={{
      px: [4,4,4,7],
      py: [3,5],
      '@media only screen and (max-width: 1060px)': {
        px: 4,
      },
    }} id="header">
      <div sx={{ 
        display: 'flex',
        alignItems: 'center',
        zIndex: 100,
        variant: 'boxes.cell',
        maxWidth: [theme => theme.maxWidths.xl, theme => theme.maxWidths.xxl]
        }}
      >
        <nav
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: "100%"
          }}
        >
          <ul sx={{
            alignItems: 'center',
            display: 'flex',
            listStyle: 'none',
            pl: 0,
            }}
          >
            {mainMenuItems.filter((menuItem) => { return menuItem.main }).map((item, index) => {
              if (item.main === 'logo') {
                return (
                  <li key={item.title}>
                    <Link
                      as={GatsbyLink}
                      aria-label="Home"
                      bare={true}
                      to={`/${item.slug}`}
                      from="header"
                    >
                      <Logo
                        fill="currentColor"
                        sx={{
                          cursor: 'pointer',
                          color: isOpen ? 'white' : 'black',
                          display: 'block',
                          height: 'auto',
                          mb: 0,
                          mr: [3,6],
                          textDecoration: 'none',
                          transitionDuration: '0.25s',
                          transitionProperty: 'opacity',
                          transitionTimingFunction: 'ease-in-out',
                          width: ['130px','130px','130px','130px','197px'],
                          '&:hover': {
                            color: isOpen ? ['secondary','secondary','secondary','secondary','primary'] : 'primary',
                          }
                        }}
                      />
                    </Link>
                  </li>
                )
              } else {
                return (
                  <li 
                    key={item.title}
                    sx={{
                      animation: `${GlitchRotate} 40s ${(index+1) * randomize(3,7)}s infinite step-end`,
                      display: isOpen ? 'none' : ['none','none','none','block'],
                      ml: item.slug === 'about' ? 0 : [3,3,6],
                      position: 'relative',
                      transform: `rotate(${randomize(-4,4)}deg) translate(${randomize(-2,2)}px, ${randomize(-2,2)}px)`,
                      '@media only screen and (max-width: 1170px)': {
                        ml: 4,
                      },
                    }}
                  >
                    <Link
                      as={GatsbyLink}
                      bare={true}
                      from="header"
                      to={`/${item.slug}`}
                      key={item.title}
                      activeClassName="is-active"
                      sx={{
                        variant: 'styles.links.nav',
                      }}
                    >
                      {item.title}
                    </Link>
                    <div className="linkSmear" sx={{
                      color: 'yellow',
                      position: 'absolute',
                      width: '120%',
                      height: '50%',
                      left: '-15%',
                      opacity: 0,
                      top: '40%',
                      transition: 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out',
                      transform: 'rotate(5deg)',
                      backgroundImage: `url(${LinkSmearYellow})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      zIndex: -1,
                    }}>
                    </div>
                  </li>
                )
              }
            })}
          </ul>
          <ul sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            {Object.keys(social).map((service, index) => {
              return (
                <li
                  key={service}
                  sx={{
                    ml: index === 0 ? 0 : 4,
                  }}
                >
                  <Link 
                    aria-label={service}
                    as={OutboundLink} 
                    to={`https://www.${service}.com/${social[service].url}`} 
                    target="_blank" 
                    bare={true} 
                    sx={{
                      color: isOpen ? 'secondary' : 'primary',
                    }}
                  >
                    <Icon name={service}></Icon>
                  </Link>
                </li>
              )
            })}
            <li
              sx={{animation: `${GlitchRotate} 20s infinite step-end`,}}
            >
              <Button
                as={GatsbyLink}
                aria-label="Home"
                to="/contact/"
                from="header"
                sx={{
                  display: ['none', 'block', 'block'],
                  ml: 5,
                  transform: `rotate(${randomize(-1,1)}deg)`,
                  px: [4,4,4,5],
                  variant: isOpen ? 'buttons.secondary' : 'buttons.primary'
                }}
              >
                Contact Us
              </Button>
            </li>
            <li>
              <Hamburger
                isHome={isHome}
                isOpen={isOpen}
                onClick={() => setIsOpen(isOpen ? 0 : 1)}
                sx={{ ml: 5 }}
              />
            </li>
          </ul>
        </nav>
      </div>
      <MobileHeader menuItems={mainMenuItems} isHome={isHome} isOpen={isOpen}/>
    </header>
  )
}

export default Header
