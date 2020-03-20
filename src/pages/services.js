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
          <h1 sx={{ variant: 'styles.h2' }}>Our Services</h1>
          <p sx={{ fontSize: [4,5,6], mb: 0, variant: 'styles.p' }}> 
            Let's move humanity forward.
          </p>
          <p sx={{ mt: 0, variant: 'styles.p' }}>
            {title} is a volunteer nonprofit, which means any volunteered time strengthens our vision, and reduces pressure on our volunteers. The following skills are urgently needed:
          </p>
          <ul>
            <li>Web development, specifically in Frontend Development</li>
            <li>Graphic design</li>
            <li>Legal support (even a few hours of your time would make our lives so much easier)</li>
            <li>Copywriting</li>
            <li>Digital Marketing</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default ServicesPage
