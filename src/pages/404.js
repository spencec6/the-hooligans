/** @jsx jsx */
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'

function NotFoundPage() {
  const data = useStaticQuery(graphql`
    query {
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
    <Layout>
      <Helmet>
        <title>Page Not Found | {title}</title>
      </Helmet>
      <div
        sx={{
          paddingY: 9,
          paddingX: 5,
        }}
      >
        <h1
          sx={{
            textAlign: 'center',
            variant: 'styles.h1'
          }}
        >
          Page not found :(
        </h1>
      </div>
    </Layout>
  )
}

export default NotFoundPage
