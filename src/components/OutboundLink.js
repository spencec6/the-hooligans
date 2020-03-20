import React from 'react'
import { PropTypes } from 'prop-types'

function OutboundLink(props) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target={props.target} rel="noopener noreferrer" href={props.to} {...props} />
}

OutboundLink.propTypes = {
  target: PropTypes.string,
}

OutboundLink.defaultProps = {
  target: ""
}

export default OutboundLink
