/** @jsx jsx */
import { any } from 'prop-types'
import { jsx } from 'theme-ui'

function Button({ as: Component, variant, ...props }) {
  return (
    <Component
      sx={{
        display: 'inline-block',
        margin: 0,
        paddingY: 3,
        paddingX: 6,
        fontSize: 2,
        fontWeight: 'bold',
        fontFamily: 'sans',
        lineHeight: 'inherit',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'primary',
        border: 0,
        borderRadius: 1,
        appearance: 'none',
        cursor: 'pointer',
        variant: variant,
        '&:disabled': {
          opacity: 0.5,
          pointerEvents: 'none',
        },
      }}
      {...props}
    />
  )
}

Button.propTypes = {
  as: any,
}

Button.defaultProps = {
  as: 'button',
  variant: 'buttons.primary',
}

export default Button
