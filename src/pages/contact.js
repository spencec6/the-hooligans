/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
// import { navigate } from 'gatsby-link'
import Block from '../components/Block'
// import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import Heading from '../components/Heading'
import SocialMedia from '../components/SocialMedia'
import Layout from '../components/Layout'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'
// import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg"
import { randomize } from "../utils/helpers"

function ContactGroup({ title, email }) {
  return (
    <div sx={{
      display: 'flex',
      flexDirection: 'column',
      mb: 3,
      mt: 7,
    }}>
      <h2 sx={{ variant: 'styles.h6', fontFamily: 'cursive', fontWeight: 'book', textTransform: 'lowercase' }}>
        {title}
      </h2>
      <div>
        <Link
          as={OutboundLink}
          title={title}
          href={`mailto:${email}`}
          from={`contact`}
          target={`_blank`}
          sx={{
            variant: 'styles.links.link',
            fontSize: [2,3]
          }}
        >
          {email}
        </Link>
      </div>
    </div>
  )
}

function ContactPage({ location }) {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      site {
        siteMetadata {
          title
          email
          description
        }
      }
      contentfulGlobalInformation {
        address
      }
    }
  `)
  const { title, description, email } = data.site.siteMetadata;
  const { address } = data.contentfulGlobalInformation;
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`Contact - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mb: [8,9], mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.xl }}>
          <Heading as="h1" variant="styles.h2" smearColor="secondary" sx={{ color: 'black', mb: 5, }}>
            Contact Us
          </Heading>
          <Heading
            smearColor="lime"
            smearHeight="100%"
            smearLeft="-10%"
            smearTop="10%"
            sx={{
              fontFamily: 'cursive',
              fontSize:[4,5,5],
              lineHeight: theme => theme.leading.tight,
              mb: 6,
              transform: `rotate(${randomize(-2,0.3)}deg) translateX(-10px)`
            }}>
            Let’s build something amazing together.
          </Heading>
          <div sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', mx: -4, }}>
            <Block width={[1,1,2/3]} sx={{ mt: 7, pr: [4,4,10] }}>
              <ContactForm/>
            </Block>
            <Block width={[1,2/3,1/3]} sx={{ mt: 7, textAlign: ['center','center','left'] }}>
              <h2 sx={{ variant: 'styles.h5', fontFamily: 'cursive', textTransform: 'lowercase', mb: 3 }}>
                Contact Information
              </h2>
              <div sx={{ color: 'greys.600', fontFamily: 'sans', mt: 3, }}>
                {address}
              </div>
              <SocialMedia sx={{ mt: 3 }} />
              <ContactGroup title={`General Inquiries`} email={email}/>
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
