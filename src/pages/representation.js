/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Heading from '../components/Heading'
import Layout from '../components/Layout'
import RepresentationForm from '../components/RepresentationForm'
import SEO from '../components/Seo'

function RepresentationPage({ location }) {
  const data = useStaticQuery(graphql`
    query RepresentationQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      representation: contentfulRepresentationPage {
        ethos {
          json
        }
        title
        introduction
        formTitle
        formIntro
      }
    }
  `)
  const { title, description } = data.site.siteMetadata
  const representation = data.representation
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`${representation.title} - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mb: [8,9], mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="lime" sx={{ color: 'black', mb: 5, }}>
            {representation.title}
          </Heading>
          <div sx={{ fontWeight: 'bold', fontFamily: 'cursive', fontSize: [3,4,5], lineHeight: theme => theme.leading.tight, my: 4 }}>
            {representation.introduction}
          </div>
          <p sx={{ my: 4 }}>
            Please enter your name, email, and website (if you already have one) and any other helpful information in the form below. We try hard to respond to respond within 1-3 business days.
          </p>
          <RepresentationForm/>
        </div>
      </div>
    </Layout>
  )
}

export default RepresentationPage
