/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Block from '../components/Block'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import { randomize } from '../utils/helpers'

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
      allContentfulTestimonials(limit: 3, sort: {fields: createdAt, order: DESC}) {
        nodes {
          author
          testimonialContent {
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
  const entries = data.allContentfulTestimonials.nodes
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
              But don't just take our word for it.
            </p>
          </Block>
          <Block width={[1,1,1/2]}>
            {entries.map((entry, index) => {
              return (
                <div 
                  sx={{
                    display: 'flex',
                    variant: 'boxes.card',
                  }}
                >
                  <div sx={{ flexShrink: 0}}>
                    {(entry.portrait) ?
                      <Img
                        key={entry.author}
                        alt={entry.author}
                        title={entry.author}
                        fluid={entry.portrait.fluid}
                        sx={{
                          borderRadius: 6,
                          flexShrink: 0,
                          height: 64,
                          mt: 4,
                          overflow: 'hidden',
                          transform: `rotate(${randomize(-1,1)}deg)`,
                          width: 64,
                          '&:first-of-type': {
                            mt: 0
                          }
                        }}
                      /> : 
                      null
                    }
                  </div>
                  <div sx={{ flexGrow: 1, fontFamily: 'sans', fontSize: [1,2], ml: 4 }}>
                    <div>{documentToReactComponents(entry.testimonialContent.json, options)}</div>
                    <div>- {entry.author}</div>
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
