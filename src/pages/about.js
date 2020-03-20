/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import CallToAction from '../sections/CallToAction'
import { services } from '../sections/Services'
import Layout from '../components/Layout'
import Link from '../components/Link'
import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'

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

function AboutPage({ location }) {
  const data = useStaticQuery(graphql`
    query AboutQuery {
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
        title={`About - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          {/* {documentToReactComponents(entries.json, options)} */}
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
    </Layout>
  )
}

export default AboutPage
