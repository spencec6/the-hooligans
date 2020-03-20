/** @jsx jsx */
import { jsx } from 'theme-ui'
import { any } from 'prop-types'

const Block = ({as: Component, width, ...props}) => {
  let widthValue = "100%";
  if(width.constructor === Array){
    widthValue = [];
    width.forEach((prop) => {
      widthValue.push(typeof prop==='number' ? `${prop*100}%` : width)
    })
  } else {
    widthValue = typeof width==='number' ? `${width*100}%` : width
  } 
  return (
    <Component sx={{
      mb: [4,0],
      listStyle: 'none',
      px: 4,
      width: widthValue
      }}
      {...props}
    />
  )
}

Block.propTypes = {
  as: any
}

Block.defaultProps = {
  as: 'div',
  width: '100%'
}

export default Block