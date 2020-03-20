/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Block from '../components/Block'
import Link from '../components/Link'
import Branding from '../images/branding.png'
import Web from '../images/web.png'
import Marketing from '../images/marketing.png'

export const services = [
  {
    slug: 'branding',
    image: Branding,
    title: 'Branding',
    description: `We'll dig deep to understand and accurately represent the essence of your campaign. We'll build you a memorable brand that communicates clearly and sets you apart.`
  },
  {
    slug: 'web',
    image: Web,
    title: 'Web',
    description: `Your website is your digital home base. We'll craft a web presence that works great on desktop and mobile devices and make sure it's easy for you to keep up-to-date.`
  },
  {
    slug: 'marketing',
    image: Marketing,
    title: 'Marketing',
    description: `Even if you have the best policies and messaging, it doesn't matter if people don't know about you. We will help make sure your message is heard far and wide.`
  }
]

const Services = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const title = data.site.siteMetadata.title
  return (
    <section sx={{ px:4, my: [8,9,10] }}>
      <div sx={{ variant: 'boxes.cell' }}>
        <h1 sx={{ variant: 'styles.h2', textAlign: 'center' }}>What We Do</h1>
        <p
          sx={{ 
            variant: 'styles.p',
            mx: 'auto',
            textAlign: 'center',
            maxWidth: theme => theme.maxWidths.lg,
            width: "100%"
          }}
        >
          {title} is an organization founded to improve the website and online capabilities of candidates who support a Universal Basic Income (UBI). We are a nonprofit corporation made up of activist volunteers for a UBI world.
        </p>
        <div sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mt: 5,
        }}>
          {services.map((service, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Block width={[1,1/3,1/3]} key={`service-${service.slug}`}>
              <img src={service.image} sx={{ display: 'block', mx: 'auto', width: "100px"}}/>
              <h3 sx={{ variant: 'styles.h4', color: 'primary', mt: 3, textAlign: 'center' }}>{service.title}</h3>
              <p sx={{ fontSize: [1,2,2], fontFamily: 'sans', textAlign: 'center' }}>{service.description}</p>
              <div sx={{textAlign: 'center'}}>
                <Link as={GatsbyLink} to={`/about/#${service.slug}`} sx={{ fontSize: [1,2] }}>Find Out More...</Link>
              </div>
            </Block>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services