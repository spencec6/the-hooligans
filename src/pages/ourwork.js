/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import CallToAction from '../sections/CallToAction'
import Portfolio from '../sections/Portfolio'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

function OurWorkPage({ location }) {
  const data = useStaticQuery(graphql`
    query OurWorkQuery {
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
        title={`Our Work - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7], position: 'relative' }}>
        <Portfolio/>
      </div>
      <div sx={{ mt: [6,7] }}>
        <CallToAction/>
      </div>
    </Layout>
  )
}

export default OurWorkPage
