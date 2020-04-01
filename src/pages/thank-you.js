/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

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
          <Heading as="h1" variant="styles.h2" smearColor="lime" sx={{ color: 'black', mb: 5, }}>
            Thank you!
          </Heading>
          <div sx={{ fontWeight: 'bold', fontFamily: 'cursive', fontSize: [3,4,5], lineHeight: theme => theme.leading.tight, my: 4 }}>
          Your message has been sent, and we will do our best to respond within 1-3 business days.
          </div>
          <Button 
            as={GatsbyLink}
            to="/"
            type="submit"
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
