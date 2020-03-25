/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

function ContactPage({ location }) {
  const data = useStaticQuery(graphql`
    query ContactQuery {
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
        title={`Contact - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', mb: 5 }}>
            Contact Us
          </h1>
          <p sx={{ fontSize: [4,5,6], lineHeight: theme => theme.leading.tight, mb: 0 }}> 
            We'd love to build something amazing with you!
          </p>
          <p sx={{ mb: 7, mt: 4 }}>
            Please enter your name, email, and website (if you already have one) and any other helpful information in the form below. We try hard to respond to respond within 1-3 business days.
          </p>
          <ContactForm/>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
