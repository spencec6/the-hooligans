/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'
import BgSmear from "-!svg-react-loader!../../images/SVGs/smear.inline.svg";

const Input = ({index, variant, as: Component, children, ...props}) => {
  return (
    <div sx={{ position: 'relative' }}>
      <Component
        sx={{
          variant: variant,
        }}
        {...props}
      >
        {children}
      </Component>
      <BgSmear
        className="input-bgSmear"
        sx={{
          display: 'block',
          height: '110%',
          left: '-5%',
          position: 'absolute',
          top: '-2%',
          transform: index % 2 === 0 ? `rotate(180deg)` : `rotate(0deg)`,
          width: '110%',
          zIndex: -1,
          }}
      />
    </div>
  )
}

Input.propTypes = {
  as: PropTypes.any,
  variant: PropTypes.string,
}

Input.defaultProps = {
  as: 'input',
  variant: 'forms.input',
  index: 1
}

export default Input