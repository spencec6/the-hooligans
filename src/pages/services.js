/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

function ServicesPage({ location }) {
  const data = useStaticQuery(graphql`
    query ServicesQuery {
      site {
        siteMetadata {
          title
          description
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
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', mb: 5  }}>Our Services</h1>
          <p sx={{ fontSize: [4,5,6], mb: 0 }}> 
            We'd love to build something amazing with you!
          </p>
          <p sx={{ mb: 7, mt: 4 }}>
            We are {title}, and this is what we do.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage
