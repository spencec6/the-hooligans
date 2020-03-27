/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'
import LinkSmear from "-!svg-react-loader?!../images/SVGs/link-smear.inline.svg";
import { randomize } from '../utils/helpers'

function Heading({
    variant,
    classes,
    smear,
    smearColor,
    smearHeight,
    smearLeft,
    smearTop,
    as: Component,
    children,
    ...props
  }) {
  return (
    <div sx={{ display: 'flex', color: 'primary', }} {...props}>
      <Component
        className={classes}
        sx={{
          variant: variant,
          color: 'inherit',
          position: 'relative',
          transform: `rotate(${randomize(-1.5,1.5)}deg)`,
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
              height: smearHeight,
              left: smearLeft,
              top: smearTop,
              transition: 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out',
              transform: `rotate(${randomize(-3,3)}deg)`,
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
  smearColor: PropTypes.oneOf(['secondary', 'primary', 'teal', 'lime', 'black', 'white']),
  smearHeight: PropTypes.string,
  smearLeft: PropTypes.string,
  smearTop: PropTypes.string,
}

Heading.defaultProps = {
  as: 'h1',
  classes: null,
  smear: true,
  smearColor: 'secondary',
  smearHeight: `${randomize(35,80)}%`,
  smearLeft: `${randomize(-20,0)}%`,
  smearTop: `${randomize(40,50)}%`,
}

export default Heading
