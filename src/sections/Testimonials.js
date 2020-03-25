/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { options } from '../utils/richTextOptions'
import Block from '../components/Block'
import { randomize } from '../utils/helpers'

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    query TestimonialsQuery {
      mobileBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 768, quality: 60) {
            src
          }
        }
      }
      desktopBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1024, quality: 60) {
            src
          }
        }
      }
      contentfulTestimonialContent {
        numberOfTestimonials
        title
        description {
          json
        }
      }
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
  const { mobileBg, desktopBg } = data
  const { title, description, numberOfTestimonials } = data.contentfulTestimonialContent
  const entries = data.allContentfulTestimonials.nodes
  return (
    <section
      id="testimonials"
      sx={{
        backgroundBlendMode: 'multiply',
        backgroundColor: 'secondary',
        backgroundImage: [`url(${mobileBg.childImageSharp.fluid.src})`, `url(${desktopBg.childImageSharp.fluid.src})`],
        width: "100%",
        px: 4,
        py: [10,11],
      }}
    >
      <div sx={{ variant: 'boxes.cell' }}>
        <div sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          mx: -4,
        }}>
          <Block width={[1,1,1/2]}>
            <h1 sx={{ variant: 'styles.h3', fontWeight: 'black', width: ['100%','70%'] }}>
              {title}
            </h1>
            {documentToReactComponents(description.json, options)}
          </Block>
          <Block width={[1,1,1/2]}>
            {entries.slice(0,numberOfTestimonials).map((entry, index) => {
              return (
                <div 
                  key={entry.author}
                  sx={{
                    display: 'flex',
                    variant: 'boxes.card',
                    mt: index === 0 ? 0 : 5,
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
                  <div sx={{ flexGrow: 1, fontFamily: 'sans', fontSize: [1,2,3], ml: 4 }}>
                    <div>{documentToReactComponents(entry.testimonialContent.json, options)}</div>
                    <div sx={{ fontSize: [0,1,2] }}>- {entry.author}</div>
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
