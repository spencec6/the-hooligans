/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

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
    branding: file(relativePath: { eq: "branding.png" }) {
      childImageSharp {
        fixed(
          width: 100,
          quality: 50,
          traceSVG: { color: "#ef336c" }
          ) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    web: file(relativePath: { eq: "web.png" }) {
      childImageSharp {
        fixed(
          width: 100,
          quality: 50,
          traceSVG: { color: "#ef336c" }
          ) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
    marketing: file(relativePath: { eq: "marketing.png" }) {
      childImageSharp {
        fixed(
          width: 100,
          quality: 50,
          traceSVG: { color: "#ef336c" }
          ) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`)
  const { title, description } = data.site.siteMetadata
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`Services - ${title}`}
        description={description}
      />
      <div sx={{ px:4, my: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', mb: 5  }}>Our Services</h1>
          <p sx={{ fontSize: [4,5,6], mb: 0 }}> 
            We'd love to build something amazing with you!
          </p>
          <p sx={{ mb: 7, mt: 4 }}>
            We are {title}, and this is what we do.
          </p>
          {services.map((service, index) => {
            return (
              <div key={`service-${service.slug}`} id={service.slug} sx={{ display: 'flex', mt: index === 0 ? 6 : 8, }}>
                <div sx={{ width: "100px" }}>
                  <div sx={{ display: 'block', flexShrink: 0, mx: 'auto', width: "100px"}}>
                    <Img alt={service.title} fixed={data[service.slug].childImageSharp.fixed}/>
                  </div>
                </div>
                <div sx={{ flexGrow: 1, pl: 5, }}>
                  <h3 sx={{ variant: 'styles.h4', color: 'primary', }}>{service.title}</h3>
                  <p sx={{ variant: 'styles.p' }}>{service.description}</p>
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
