/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql, Link as GatsbyLink } from 'gatsby'
import { GlitchRotate } from '../components/Animations'
import Button from '../components/Button'
import Hamburger from '../components/Hamburger'
import Link from '../components/Link'
import Logo from "-!svg-react-loader!../images/SVGs/TheHooligans-Logo.inline.svg";
import LogoIcon from '../components/LogoIcon'
import LinkSmearYellow from '../images/SVGs/LinkSmearYellow.svg'
import MobileHeader from '../components/MobileHeader'
import { randomize } from '../utils/helpers'

function Header({path}) {
  const data = useStaticQuery(graphql`
    query {
      menu: allContentfulMenu {
        nodes {
          menItem {
            ... on ContentfulAbout {
              main
              slug
              title
            }
            ... on ContentfulBioPage {
              main
              slug
              title
            }
            ... on ContentfulServices {
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

  const mainMenuItems = []
  mainMenuItems.push({main: 'logo', slug: '', title: 'Home'})
  data.menu.nodes[0].menItem.forEach((menuItem, index) => {
    mainMenuItems.push({main: menuItem.main, slug: menuItem.slug, title: menuItem.title })
  })

  const [isOpen, setIsOpen] = useState(0); 

  const isHome = path === '/' ? 1 : 0
  return (
    <header sx={{ px: [4,4,4,11], py: [3,5] }} id="header">
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
            {mainMenuItems.filter((menuItem) => { return menuItem.main }).map((item) => {
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
                          color: 'black',
                          display: ['none','none','block'],
                          height: '60px',
                          mb: 0,
                          mr: 7,
                          textDecoration: 'none',
                          transitionDuration: '0.25s',
                          transitionProperty: 'opacity',
                          transitionTimingFunction: 'ease-in-out',
                          width: '197px',
                          '&:hover': {
                            color: `primary`
                          }
                        }}
                      />
                      <LogoIcon
                        fill="currentColor"
                        sx={{
                          cursor: 'pointer',
                          color: isOpen ? `white` : `black`,
                          display: ['block','block','none'],
                          height: '60px',
                          mb: 0,
                          mr: 7,
                          textDecoration: 'none',
                          transitionDuration: '0.25s',
                          transitionProperty: 'opacity',
                          transitionTimingFunction: 'ease-in-out',
                          width: '60px',
                          '&:hover': {
                            color: isOpen ? `yellow` : `primary`
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
                      ml: item.slug === 'about' ? 0 : [4,6],
                      position: 'relative',
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
                        cursor: 'pointer',
                        display: ['none', 'none', 'block'],
                        mb: 0,
                        textDeocration: 'none',
                        variant: 'styles.links.nav',
                        color: 'black',
                        transition: 'transform 0.25s ease-in-out',
                        '&.is-active ~ .linkSmear': {
                          opacity: 1,
                          transform: 'rotate(0deg)',
                        },
                        '&:hover': {
                          color: 'primary',
                          transform: 'translateY(-1px)',
                        },
                        '&:hover ~ .linkSmear': {
                          opacity: 1,
                          transform: 'rotate(0deg)',
                        }
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
            <li>
              <Button
                as={GatsbyLink}
                aria-label="Home"
                to="/contact/"
                from="header"
                sx={{
                  animation: `${GlitchRotate} 20s infinite step-end`,
                  display: ['none', 'none', 'initial'],
                  ml: 4,
                  variant: 'buttons.primary',
                  transform: `rotate(${randomize(-1,1)}deg)`,
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
