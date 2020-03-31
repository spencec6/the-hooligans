/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { randomize } from '../utils/helpers'
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

export const services = [
  {
    slug: 'branding',
    title: 'Branding',
    description: `We'll dig deep to understand and accurately represent the essence of your campaign. We'll build you a memorable brand that communicates clearly and sets you apart.`
  },
  {
    slug: 'web',
    title: 'Web',
    description: `Your website is your digital home base. We'll craft a web presence that works great on desktop and mobile devices and make sure it's easy for you to keep up-to-date.`
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    description: `Even if you have the best policies and messaging, it doesn't matter if people don't know about you. We will help make sure your message is heard far and wide.`
  }
]

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
        services {
          slug
          title
          excerpt
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
      <div sx={{ px:4, mb: [10,11], mt: [6,7] }}>
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
                <div sx={{ width: "170px" }}>
                  <div sx={{ display: 'block', flexShrink: 0, mx: 'auto',  position: 'relative', width: "100%"}}>
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
                <div sx={{ flexGrow: 1, pl: 5, }}>
                  <h3 className="service-heading" sx={{ variant: 'styles.h4', color: 'primary', }}>{service.title}</h3>
                  <p sx={{ variant: 'styles.p', fontFamily: 'sans', transform: `rotate(${randomize(-1,1)}deg)`, }}>{service.excerpt}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        <CallToAction/>
      </div>
    </Layout>
  )
}

export default ServicesPage
