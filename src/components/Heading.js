/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'
import LinkSmear from "-!svg-react-loader?!../images/SVGs/link-smear.inline.svg";
import { randomize } from '../utils/helpers'

function Heading({ variant, smear, smearColor, as: Component, children, ...props }) {
  return (
    <div sx={{ display: 'flex', color: 'primary', }} {...props}>
      <Component
        sx={{
          variant: variant,
          color: 'inherit',
          position: 'relative',
          transform: `rotate(${randomize(-2,2)}deg)`,
          zIndex: 1,
        }}
      >
        {children}
        { smear ? 
          <LinkSmear
            sx={{
              color: smearColor,
              position: 'absolute',
              width: '120%',
              height: '55%',
              left: '-15%',
              top: '40%',
              transition: 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out',
              transform: `rotate(${randomize(-4,4)}deg)`,
              zIndex: -1,
            }}
          /> :
          null
        }
      </Component>
    </div>
  )
}

Heading.propTypes = {
  as: PropTypes.any,
  smear: PropTypes.bool,
  smearColor: PropTypes.oneOf(['secondary', 'primary', 'teal', 'lime', 'black', 'white'])
}

Heading.defaultProps = {
  as: 'h1',
  smear: true,
  smearColor: 'secondary'
}

export default Heading
