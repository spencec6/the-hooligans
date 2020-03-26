/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { randomize } from '../utils/helpers'
import ContactForm from '../components/ContactForm'
import Heading from '../components/Heading'
import Icon from '../components/Icon'
import Layout from '../components/Layout'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'

function ContactPage({ location }) {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      site {
        siteMetadata {
          title
          address
          email
          description
          social {
            facebook {
              url
            }
            twitter {
              url
            }
            instagram {
              url
            }
          }
        }
      }
    }
  `)
  const { title, description, address, email, social } = data.site.siteMetadata
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`Contact - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mb: [8,9], mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="lime" sx={{ color: 'black', mb: 5, }}>
            Contact Us
          </Heading>
          <p sx={{
            variant: 'styles.p',
            display: 'inline-block',
            fontSize:[4,5,6],
            fontWeight: 'bold',
            lineHeight: theme => theme.leading.tight,
            mb: 2,
            px: 2,
            transform: `rotate(${randomize(-1.2,0.3)}deg) translateX(-10px)`
          }}>
            <span sx={{
              bg: 'lime',
              color: 'primary',
              }}>
                We'd love to build something amazing with you!
            </span>
          </p>
          {/* <p sx={{ fontSize: [4,5,6], lineHeight: theme => theme.leading.tight, mb: 0 }}> 
            We'd love to build something amazing with you!
          </p> */}
          <p sx={{ my: 4 }}>
            Please enter your name, email, and website (if you already have one) and any other helpful information in the form below. We try hard to respond to respond within 1-3 business days.
          </p>
          <ContactForm/>
          <div sx={{ mt: 7 }}>
            <h2 sx={{ variant: 'styles.h5', mb: 3, }}>Contact Information</h2>
            <Link
              as={OutboundLink}
              title={`Send us an e-mail`}
              href={`mailto:${email}`}
              from={`footer`}
              target={`_blank`}
              sx={{
                variant: 'styles.links.link',
                fontSize: [2,3]
              }}
            >
              {email}
            </Link>
            <div sx={{ color: 'greys.600', mt: 1, }}>
              {address}
            </div>
            <div sx={{
              justifyContent: ['center', 'flex-start'],
              display: 'flex',
              mt: 2,
              width: '100%',
            }}>
              {Object.keys(social).map((service, index) => {
                return (
                  <Link 
                    key={service} 
                    aria-label={service}
                    as={OutboundLink} 
                    to={`https://www.${service}.com/${social[service].url}`} 
                    target="_blank" 
                    bare={true} 
                    sx={{
                      mr: 3,
                      '&:last-of-type': {
                        mr: 0
                      }
                    }}
                  >
                    <Icon name={service}></Icon>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
