/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Block from './Block'
import Link from './Link'
import OutboundLink from './OutboundLink'

let paragraphIndex = 0
const options = {
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
      paragraphIndex++
      return (
        <p sx={{ variant: 'styles.p', fontFamily: 'sans' }}>
          {next}
        </p>
      )
    },
  },
}

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    query TestimonialsQuery {
      allContentfulTestimonial(limit: 3, sort: {fields: createdAt, order: DESC}) {
        nodes {
          name
          content {
            json
          }
          createdAt
          portrait {
            fluid(maxWidth: 64) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  `)
  const entries = data.allContentfulTestimonial.nodes
  return (
    <section
      id="testimonials"
      sx={{
        bg: 'secondary',
        width: "100%",
        px: 4,
        py: [10,11],
      }}
    >
      <div sx={{ variant: 'boxes.cell' }}>
        <div sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mx: -4,
        }}>
          <Block width={[1,1,1/2]}>
            <h1 sx={{ variant: 'styles.h3', fontWeight: 'black' }}>Our customers love what we do</h1>
            <p>
              There are now over 60 candidates who support UBI across the United States. We have had the opportunity to build many of their digital marketing strategies from the ground up.
            </p>
          </Block>
          <Block width={[1,1,1/2]}>
            {entries.map((entry, index) => {
              return (
                <div 
                  key={entry.name}
                  sx={{
                    display: 'flex',
                    mt: 4,
                    variant: 'boxes.card',
                    transform: `rotate(${(Math.random()*2)-2}deg)`,
                    '&:first-of-type': {
                      mt: 0
                    }
                  }}
                >
                  <div sx={{ flexShrink: 0}}>
                    <Img
                      alt={entry.name}
                      title={entry.name}
                      fluid={entry.portrait.fluid}
                      sx={{
                        borderRadius: 6,
                        flexShrink: 0,
                        height: 64,
                        overflow: 'hidden',
                        width: 64,
                      }}
                    >
                    </Img>
                  </div>
                  <div sx={{ flexGrow: 1, fontFamily: 'sans', fontSize: [1,2], ml: 4 }}>
                    <div>{documentToReactComponents(entry.content.json, options)}</div>
                    <div>- {entry.name}</div>
                  </div>
                </div>
              )
            })}
          </Block>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
