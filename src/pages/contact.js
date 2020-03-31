/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { navigate } from 'gatsby-link'
import Block from '../components/Block'
import Button from '../components/Button'
import ContactForm from '../components/ContactForm'
import Heading from '../components/Heading'
import Icon from '../components/Icon'
import Layout from '../components/Layout'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg"
import { randomize } from "../utils/helpers"

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
          {/* <div sx={{ variant: 'styles.h5', fontWeight: 'bold', fontFamily: 'cursive', lineHeight: theme => theme.leading.tight, my: 4, textTransform: 'unset' }}>
            Let’s build something amazing together.
          </div> */}
          <div sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', mx: -4, }}>
            <Block width={[1,1,2/3]} sx={{ mt: 7, pr: [4,4,10] }}>
              {/* <p sx={{ my: 4 }}>
                Please fill out the form below, and tell us what your biggest challenge or obstacle is. We’ll tell you how we can help you solve it.
              </p> */}
              <ContactForm/>
            </Block>
            <Block width={[1,2/3,1/3]} sx={{ mt: 7, textAlign: ['center','center','left'] }}>
              <h2 sx={{ variant: 'styles.h5', fontFamily: 'cursive', textTransform: 'lowercase', mb: 3 }}>Contact Information</h2>
              <div sx={{ color: 'greys.600', fontFamily: 'sans', mt: 3, }}>
                {address}
              </div>
              <div sx={{
                justifyContent: ['center', 'center', 'flex-start'],
                display: 'flex',
                mt: 3,
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
              <div sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 3,
                mt: 7,
              }}>
                <h2 sx={{ variant: 'styles.h6', fontFamily: 'cursive', fontWeight: 'book', textTransform: 'lowercase' }}>
                  Media Requests
                </h2>
                <div>
                  <Link
                    as={OutboundLink}
                    title={`Media Requests`}
                    href={`mailto:media@thehooligansagency.com?subject=The Hooligans Media Request`}
                    from={`contact`}
                    target={`_blank`}
                    sx={{
                      variant: 'styles.links.link',
                      fontSize: [2,3]
                    }}
                  >
                    media@thehooligansagency.com
                  </Link>
                </div>
              </div>
              <div sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 3,
                mt: 7,
              }}>
                <h2 sx={{ variant: 'styles.h6', fontFamily: 'cursive', fontWeight: 'book', textTransform: 'lowercase' }}>
                  General Inquiries
                </h2>
                <div>
                  <Link
                    as={OutboundLink}
                    title={`General Inquiries`}
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
              <div sx={{
                mb: 3,
                mt: 7,
                // position: 'relative',
              }}>
                <div sx={{  }}>
                  <h2 sx={{ variant: 'styles.h6', fontFamily: 'cursive', fontWeight: 'book', textTransform: 'lowercase' }}>
                    Careers
                  </h2>
                  <div sx={{ mb: 4 }}>
                    <Link
                      as={OutboundLink}
                      title={`Careers`}
                      href={`mailto:careers@thehooligansagency.com`}
                      from={`contact`}
                      target={`_blank`}
                      sx={{
                        variant: 'styles.links.link',
                        fontSize: [2,3]
                      }}
                    >
                      careers@thehooligansagency.com
                    </Link>
                  </div>
                  <div sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                    <p sx={{ display: 'inline-block', fontFamily: 'sans', fontSize: [1,2], mb: 1 }}>
                      Psst. We're always looking for new Hooligans.
                    </p>
                    <div>
                      <Button
                        as="button"
                        from={'contact'}
                        onClick={() => navigate('/careers')}
                        sx={{
                          variant: 'buttons.primary',
      
                          fontSize: [0,1],
                          mb: 3,
                          px: 3,
                          py: 1,
                        }}
                      >
                        See Careers
                      </Button>
                    </div>
                    <BgSmear sx={{
                      color: 'secondary',
                      height: '120%',
                      left: `-10%`,
                      position: 'absolute',
                      top: '-9%',
                      width: `120%`,
                      zIndex: -1,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
