/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'

const Select = ({variant, as: Component, children, ...props}) => {
  return (
    <div sx={{ alignItems: 'center', display: 'flex', position: 'relative'}}>
      <Component
        sx={{
          variant: variant,
        }}
        {...props}
      >
        {children}
      </Component>
      <div sx={{ color: 'greys.500', fontSize: 5, fontWeight: 'black', position: 'absolute', right: 3, pointerEvents: 'none', userSelect: 'none' }}>&#8964;</div>
    </div>
  )
}

Select.propTypes = {
  as: PropTypes.any,
  variant: PropTypes.string,
}

Select.defaultProps = {
  as: 'select',
  variant: 'forms.select',
}

export default Select