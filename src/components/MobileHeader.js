/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Link from './Link'
import { randomize } from '../utils/helpers'

const MobileHeader = ({ menuItems, isHome, isOpen, ...props }) => {
return (
    <div
      mobilemenu={isOpen}
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary',
        bottom: 0,
        left: "100vw",
        maxHeight: '100vh',
        top: 0,
        transform: isOpen ? `translateX(-100vw)` : `translateX(0)`,
        transition: isOpen ? 'transform 0.12s ease-in-out' : '',
        width: "100vw",
        pointerEvents: isOpen ? `all` : `none`,
        display: ['flex', 'flex', 'none'],
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 99,
      }}
    >
      <ul sx={{ listStyle: 'none', m: 0, mt: 8, p: 0 }}>
        {menuItems.map((item, index) => {
          return (
            <li
              key={`${item.title}-mobile`}
              mobilemenu={isOpen}
              delay={`${index*0.1}s`}
              sx={{
                display: 'block',
                mb: 0,
                mt: index === 0 ? 0 : 4,
                opacity: isOpen ? `1` : `0`,
                textDecoration: 'none',
                transform: isOpen ? `rotate(${randomize(-2,2)}deg) translate(${randomize(-3,3)}px, ${randomize(-3,3)}px)` : `translateX(100vw)`,
                transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                transitionDelay: isOpen ? `${index*0.1}s` : '',
              }}
            >
              <Link
                as={GatsbyLink}
                from="header-mobile"
                to={`/${item.slug}`}
                sx={{
                  variant: 'styles.h1',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'yellow',
                    textDecoration: 'none',
                  }
                }}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MobileHeader