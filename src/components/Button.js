/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import { randomize } from '../utils/helpers';

function Button({ as: Component, children, ...props }) {
  return (
    <Component
      sx={{
        appearance: 'none',
        bg: 'transparent',
        border: 0,
        borderRadius: 1,
        color: 'white',
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: 'sans',
        fontSize: 2,
        fontWeight: 'black',
        letterSpacing: theme => `${theme.tracking.loose}`,
        lineHeight: 'inherit',
        margin: 0,
        paddingX: 6,
        paddingY: 3,
        position: 'relative',
        textAlign: 'center',
        textDecoration: 'none',
        textTransform: 'uppercase',
        zIndex: 10,
        '&:disabled': {
          opacity: 0.5,
          pointerEvents: 'none',
        },
        '&:hover': {
          fontFamily: 'cursive',
          textTransform: 'lowercase',
        },
        '&:hover .button-bgSmear': {
          transform: `rotate(${randomize(172,188)}deg)`
        }
      }}
      {...props}
    >
      <BgSmear
        className="button-bgSmear"
        sx={{
          display: 'block',
          height: '110%',
          left: '-5%',
          position: 'absolute',
          top: '-2%',
          transform: 'rotate(0deg)',
          width: '110%',
          zIndex: -1,
          }}
      />
      {children}
    </Component>
  )
}

Button.propTypes = {
  as: PropTypes.any,
}

Button.defaultProps = {
  as: 'button',
  variant: 'buttons.primary',
}

export default Button
