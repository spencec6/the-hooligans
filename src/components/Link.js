/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'

function Link({ variant, as: Component, bare, ...props }) {
  return (
    <Component
      sx={{
        variant: variant,
        boxShadow: !bare ? theme => theme.shadows.link : '',
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: !bare ? 'black' : '',
          color: 'secondary',
          boxShadow: !bare ? theme => theme.shadows.linkHover : '',
        },
      }}
      {...props}
    />
  )
}

Link.propTypes = {
  as: PropTypes.any,
  bare: PropTypes.bool,
  variant: PropTypes.string,
}

Link.defaultProps = {
  as: 'a',
  bare: false,
  variant: 'styles.links.link',
}

export default Link
