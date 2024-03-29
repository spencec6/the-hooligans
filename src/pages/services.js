/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { randomize } from '../utils/helpers'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg"
import RoundSmear1 from "-!svg-react-loader!../images/SVGs/round-smear-1.inline.svg";
import RoundSmear2 from "-!svg-react-loader!../images/SVGs/round-smear-2.inline.svg";
import RoundSmear3 from "-!svg-react-loader!../images/SVGs/round-smear-3.inline.svg";
import { GlitchRotate } from '../components/Animations'
import Heading from '../components/Heading'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import CallToAction from '../sections/CallToAction'

const smearComponents = [
  RoundSmear1,
  RoundSmear2,
  RoundSmear3
]

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      return (
        <p
          sx={{
            variant: 'styles.p',
            fontFamily: 'sans',
            transform: `rotate(${randomize(-1,1)}deg)`,
          }}>
          {next}
        </p>
      )
    },
    [BLOCKS.HEADING_1]: (_node, next) => {
      return (
        <h4 sx={{ variant: 'styles.h5', color: 'primary', }}>
          {next}
        </h4>
      )
    }
  }
}

function ServicesPage({ location }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
      serviceContent: contentfulServices {
        title
        slug
        introduction
        bespokeCreativeTeams {
          json
        }
        services {
          slug
          title
          description {
            json
          }
          icon {
            fixed(width: 150, quality: 50) {
              ...GatsbyContentfulFixed_tracedSVG
            }
          }
        }
      }
    }
`)
  const { title, description } = data.site.siteMetadata
  const serviceContent = data.serviceContent
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`${serviceContent.title} - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mb: [10,12], mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="secondary" sx={{ color: 'black', mb: 5  }}>
            {serviceContent.title}
          </Heading>
          <Heading
            smearColor="lime"
            smearHeight="100%"
            smearLeft="-10%"
            smearTop="10%"
            sx={{
              fontFamily: 'cursive',
              fontSize:[4,5,5],
              lineHeight: theme => theme.leading.tight,
              mb: 8,
              transform: `rotate(${randomize(-2,0.3)}deg) translateX(-10px)`
            }}
          >
            {serviceContent.introduction}
          </Heading>
          {serviceContent.services.map((service, index) => {
            const RoundSmear = smearComponents[Math.round(randomize(-0.5,2.5))];
            return (
              <div
                key={`service-${service.slug}`}
                id={service.slug}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  mt: index === 0 ? 6 : 8,
                  '&:hover .service-bgSmear': {
                    color: 'lime'
                  },
                  '&:hover .service-heading': {
                    color: 'black',
                    fontFamily: 'cursive',
                    textTransform: 'lowercase',
                  },
                }}
              >
                <div sx={{ flexShrink: 0, width: "170px" }}>
                  <div sx={{ display: 'block', mx: 'auto',  position: 'relative', width: "100%"}}>
                    <RoundSmear
                      className="service-bgSmear"
                      sx={{
                        color: 'secondary',
                        height: '100%',
                        position: 'absolute',
                        transform: `rotate(${randomize(0,360)}deg)`,
                        width: '100%',
                        zIndex: 0,
                      }}
                    />
                    <Img alt={service.title} fixed={service.icon.fixed} sx={{ animation: `${GlitchRotate} ${(index+1) * randomize(5,15)}s infinite step-end` }}/>
                  </div>
                </div>
                <div sx={{ flexGrow: 1, pl: [0,5], minWidth: 0, maxWidth: '100%', mt: [3, 0], width: ['100%',0,]}}>
                  <h3 className="service-heading" sx={{ variant: 'styles.h4', color: 'primary', }}>{service.title}</h3>
                  {documentToReactComponents(service.description.json, options)}
                </div>
              </div>
            )
          })}
          <div sx={{ mt: [9,10], position: 'relative', }}>
            <BgSmear sx={{
              color: 'teal',
              height: '125%',
              left: `-10%`,
              opacity: 0.9,
              position: 'absolute',
              top: '-9%',
              width: `120%`,
              zIndex: -1,
              }}
            />
            {documentToReactComponents(serviceContent.bespokeCreativeTeams.json, options)}
          </div>
        </div>
      </div>
      <div sx={{
        mt: [6,7],
      }}>
        <CallToAction/>
      </div>
    </Layout>
  )
}

export default ServicesPage
