/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GlitchRotate } from '../components/Animations'
import Button from '../components/Button'
import Hamburger from '../components/Hamburger'
import Link from '../components/Link'
import LogoIcon from '../components/LogoIcon'
import LinkSmearYellow from '../images/SVGs/LinkSmearYellow.svg'
import MobileHeader from '../components/MobileHeader'
import { randomize } from '../utils/helpers'

const menuItems = [
  {
    title: "Home",
    to: "/"
  },
  {
    title: "About",
    to: "/about/"
  },
  {
    title: "Services",
    to: "/services/"
  },
  {
    title: "Portfolio",
    to: "/portfolio/"
  },
  {
    title: "Contact Us",
    to: "/contact/"
  },
]

function Header({path}) {
  const [isOpen, setIsOpen] = useState(0); 

  const isHome = path === '/' ? 1 : 0
  const mainMenuItems = menuItems.filter((item) => { return item.to !== '/contact/' }) // contact is displayed in it's own button on non-mobile view.
  return (
    <header sx={{ px: [6,7,9,11], py: 5 }}>
      <div sx={{ 
        display: 'flex',
        alignItems: 'center',
        zIndex: 100,
        variant: 'boxes.cell',
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
            {mainMenuItems.map((item) => {
              if (item.to === '/') {
                return (
                  <Link
                    as={GatsbyLink}
                    bare={true}
                    key={item.title}
                    to={item.to}
                    from="header"
                  >
                    <LogoIcon
                      fill="currentColor"
                      sx={{
                        cursor: 'pointer',
                        color: isOpen ? `white` : `black`,
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
                )
              } else {
                return (
                  <div 
                    key={item.title}
                    sx={{
                      ml: item.title === 'About' ? 0 : [4,6],
                      position: 'relative',
                    }}
                  >
                    <Link
                      as={GatsbyLink}
                      bare={true}
                      from="header"
                      to={item.to}
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
                  </div>
                )
              }
            })}
          </ul>
          <ul sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Button
              as={GatsbyLink}
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
            <Hamburger
              isHome={isHome}
              isOpen={isOpen}
              onClick={() => setIsOpen(isOpen ? 0 : 1)}
            />
          </ul>
        </nav>
      </div>
      <MobileHeader menuItems={menuItems} isHome={isHome} isOpen={isOpen}/>
    </header>
  )
}

export default Header
