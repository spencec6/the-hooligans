/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'

const Label = ({variant, required, as: Component, children, ...props}) => {
  return (
    <Component
      sx={{ variant: variant }}
      {...props}
    >
      {children}
      {required ? <span sx={{ color: 'magenta' }}>*</span> : ''}
    </Component>
  )
}

Label.propTypes = {
  as: PropTypes.any,
  variant: PropTypes.string,
}

Label.defaultProps = {
  as: 'label',
  variant: 'forms.label',
}

export default Label