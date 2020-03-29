/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Link from './Link'
import { randomize } from '../utils/helpers'

const MenuItem = (props) => {
  // console.log(props)
  return (
    <li
        mobilemenu={props.isOpen}
        sx={{
          display: 'block',
          mb: 0,
          mt: props.index === 0 ? 0 : 4,
          opacity: props.isOpen ? `1` : `0`,
          textDecoration: 'none',
          transform: props.isOpen ? `rotate(${randomize(-2,2)}deg) translate(${randomize(-3,3)}px, ${randomize(-3,3)}px)` : `translateX(100vw)`,
          transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
          transitionDelay: props.isOpen ? `${props.index*0.1}s` : '',
          visibility: props.isFake ? 'hidden' : 'unset'
        }}
      >
        <Link
          as={GatsbyLink}
          from="header-mobile"
          to={`/${props.item.slug}`}
          sx={{
            variant: 'styles.h2',
            color: 'white',
            display: 'inline-block',
            textDecoration: 'none',
            '&:hover': {
              color: 'yellow',
              fontFamily: 'cursive',
              textDecoration: 'none',
              textTransform: 'lowercase'
            }
          }}
        >
          {props.item.title}
        </Link>
      </li>
  )
}

const MobileHeader = ({ menuItems, isHome, isOpen, ...props }) => {
  let longest = menuItems[0]
  menuItems.forEach((item) => { if(item.title.length > longest.title.length) { longest = item };})
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
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 99,
      }}
    >
      <ul sx={{ listStyle: 'none', m: 0, mt: -3, p: 0 }}>
        <MenuItem isFake={true} isOpen={isOpen} item={longest} />
        {menuItems.map((item, index) => {
          return (
            <MenuItem isOpen={isOpen} item={item} index={index} key={`${item.title}-mobile`} />
          )
        })}
      </ul>
    </div>
  )
}

export default MobileHeader