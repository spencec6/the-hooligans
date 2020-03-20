/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'

const Input = ({variant, as: Component, children, ...props}) => {
  return (
    <Component
      sx={{
        variant: variant,
      }}
      {...props}
    />
  )
}

Input.propTypes = {
  as: PropTypes.any,
  variant: PropTypes.string,
}

Input.defaultProps = {
  as: 'input',
  variant: 'forms.input',
}

export default Input