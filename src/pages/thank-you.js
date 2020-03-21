/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Button from '../components/Button'

function ThankYouPage({ location }) {
  const data = useStaticQuery(graphql`
    query ThankYouQuery {
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
        title={`Thank You - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2' }}>Thank you!</h1>
          <p sx={{ fontSize: [4,5,6], mb: 0, variant: 'styles.p' }}> 
            Your message has been sent, and we will do our best to respond within 1-3 business days.
          </p>
          <Button 
            as={GatsbyLink}
            to="/"
            from="thank-you"
            sx={{ variant: 'buttons.secondary', mt: 3}}>
            Go Home
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default ThankYouPage
