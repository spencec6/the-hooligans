/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { randomize } from '../utils/helpers'
import RoundSmear1 from "-!svg-react-loader!../images/SVGs/round-smear-1.inline.svg";
import RoundSmear2 from "-!svg-react-loader!../images/SVGs/round-smear-2.inline.svg";
import RoundSmear3 from "-!svg-react-loader!../images/SVGs/round-smear-3.inline.svg";
import { GlitchRotate } from '../components/Animations'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

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
          <h1 sx={{ variant: 'styles.h2', mb: 5  }}>
            {serviceContent.title}
          </h1>
          <p sx={{
              variant: 'styles.p',
              display: 'inline-block',
              fontSize:[4,5,6],
              fontWeight: 'bold',
              lineHeight: theme => theme.leading.tight,
              mb: [4,5],
              px: 2,
              transform: `rotate(${randomize(-1.2,0.3)}deg) translateX(-10px)`
            }}>
              <span sx={{
                bg: 'lime',
                color: 'primary',
               }}>
                 {serviceContent.introduction}
              </span>
            </p>
          {serviceContent.services.map((service, index) => {
            const RoundSmear = smearComponents[Math.round(randomize(-0.5,2.5))];
            return (
              <div key={`service-${service.slug}`} id={service.slug} sx={{ display: 'flex', mt: index === 0 ? 6 : 8, }}>
                <div sx={{ width: "170px" }}>
                  <div sx={{ display: 'block', flexShrink: 0, mx: 'auto',  position: 'relative', width: "100%"}}>
                    <RoundSmear
                      sx={{
                        color: 'secondary',
                        height: '100%',
                        position: 'absolute',
                        transform: `rotate(${randomize(0,360)}deg)`,
                        width: '100%',
                        zIndex: 0,
                      }}
                    />
                    <Img alt={service.title} fixed={service.icon.fixed} sx={{ animation: `${GlitchRotate} ${(index+1) * randomize(3,15)}s infinite step-end` }}/>
                  </div>
                </div>
                <div sx={{ flexGrow: 1, pl: 5, }}>
                  <h3 sx={{ variant: 'styles.h4', color: 'primary', }}>{service.title}</h3>
                  <p sx={{ variant: 'styles.p' }}>{service.excerpt}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage
