/** @jsx jsx */
import { PropTypes } from 'prop-types'
import { jsx } from 'theme-ui'

function RandomRotate({ min, max, as: Component, ...props }) {
  let rotation = Math.random() * (max - min) + min;
  return (
    <Component
      sx={{
        transform: `rotate(${rotation}deg)`
      }}
      {...props}
    />
  )
}

RandomRotate.propTypes = {
  as: PropTypes.any,
  max: PropTypes.number,
  min: PropTypes.number,
}

RandomRotate.defaultProps = {
  as: 'div',
  min: -1,
  max: 1,
}

export { RandomRotate }
