/** @jsx jsx */
import { jsx } from 'theme-ui'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'

export const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return (
        <Link
          as={OutboundLink}
          from="testimonial"
          target="_blank"
          to={`${node.data.uri}`}
        >
          {next}
        </Link>
      )
    },
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      return (
        <p sx={{ variant: 'styles.p' }}>
          {next}
        </p>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      return (
        <img
          alt={node.data.target.fields.title["en-US"]}
          src={node.data.target.fields.file["en-US"].url}
          sx={{
            display: 'block',
            maxWidth: '100%',
            mx: 'auto',
          }}
          />
      );
    }
  },
}