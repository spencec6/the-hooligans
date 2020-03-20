/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import BIEN from '../images/affiliates/BIEN.png'
import Block from '../components/Block'
import CallToAction from '../components/CallToAction'
import Layout from '../components/Layout'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'
import { services } from '../components/Services'

let paragraphIndex = 0
const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return (
        <Link
          as={OutboundLink}
          from="about"
          target="_blank"
          to={`${node.data.uri}`}
        >
          {next}
        </Link>
      )
    },
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      paragraphIndex++
      return (
        <p sx={{ variant: 'styles.p' }}>
          {next}
        </p>
      )
    },
    [BLOCKS.HEADING_2]: (_node, next) => {
      paragraphIndex++
      return (
        <h2 sx={{ variant: 'styles.h2' }}>
          {next}
        </h2>
      )
    },
  },
}

const affiliates = [
  {
    slug: 'affiliate1',
    title: 'Affiliate #1',
    url: 'https://basicincome.org',
    image: BIEN
  },
  {
    slug: 'affiliate2',
    title: 'Affiliate #2',
    url: 'https://basicincome.org',
    image: BIEN
  },
  {
    slug: 'affiliate3',
    title: 'Affiliate #3',
    url: 'https://basicincome.org',
    image: BIEN
  },
]

function AboutPage({ location }) {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      contentfulAboutPage {
        aboutContent {
          json
        }
      }
    }
  `)
  const { title, description } = data.site.siteMetadata
  const entries = data.contentfulAboutPage.aboutContent
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`About - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          {documentToReactComponents(entries.json, options)}
          <h3 sx={{ variant: 'styles.h3', mt: [6,7] }}>What We Do</h3>
          {services.map((service, index) => {
            return (
              <div key={`service-${service.slug}`} id={service.slug} sx={{ display: 'flex', mt: index === 0 ? 6 : 8, }}>
                <div sx={{ width: "100px" }}>
                  <img src={service.image} sx={{ display: 'block', flexShrink: 0, mx: 'auto', width: "100px"}}/>
                </div>
                <div sx={{ flexGrow: 1, pl: 5, }}>
                  <h3 sx={{ variant: 'styles.h4', color: 'primary', }}>{service.title}</h3>
                  <p sx={{ variant: 'styles.p' }}>{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        <CallToAction/>
      </div>
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h3 sx={{ variant: 'styles.h3', mt: 9, textAlign: 'center' }}>Our Affiliated Initatives</h3>
          <p sx={{ textAlign: 'center' }}>
            We have many friends working together for the same vision. Be sure to check them out!
          </p>
          <div sx={{ display: 'flex', justifyContent: 'center', mb: [8,9] }}>
            {affiliates.map((affiliate, index) => {
              return (
                <Block key={affiliate.slug} width={[1,1/3]}>
                  <Link as={OutboundLink} to={affiliate.url} target="_blank" bare={true}>
                    <img src={affiliate.image} sx={{ display: 'block', filter: 'grayscale(0.9)', flexShrink: 0, mx: 'auto', height: "auto", opacity: 0.5, width: "200px", '&:hover': { filter: 'grayscale(0)', opacity: 1 }}}/>
                  </Link>
                </Block>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
