/** @jsx jsx */
import Helmet from 'react-helmet'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { randomize } from '../utils/helpers'

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
  const { title } = data.site.siteMetadata
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found | {title}</title>
      </Helmet>
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', transform: `rotate(${randomize(-4,4)}deg)` }}>Page not found :(</h1>
          <Button
            to='/'
            from='404'
            as={GatsbyLink}
            sx={{ variant: 'buttons.secondary', mt: 8}}>
            Go Home
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
