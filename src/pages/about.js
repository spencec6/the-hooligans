/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
// import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import CallToAction from '../sections/CallToAction'
import Testimonials from '../sections/Testimonials'
// import { services } from '../sections/Services'
import Layout from '../components/Layout'
// import Link from '../components/Link'
// import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'

// const options = {
//   renderNode: {
//     [INLINES.HYPERLINK]: (node, next) => {
//       return (
//         <Link
//           as={OutboundLink}
//           from="about"
//           target="_blank"
//           to={`${node.data.uri}`}
//         >
//           {next}
//         </Link>
//       )
//     },
//     [BLOCKS.PARAGRAPH]: (_node, next) => {
//       return (
//         <p sx={{ variant: 'styles.p' }}>
//           {next}
//         </p>
//       )
//     },
//     [BLOCKS.HEADING_2]: (_node, next) => {
//       return (
//         <h2 sx={{ variant: 'styles.h2' }}>
//           {next}
//         </h2>
//       )
//     },
//   },
// }

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
          <p>Some thoughtful words about what we do.</p>
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        <Testimonials/>
        <CallToAction/>
      </div>
    </Layout>
  )
}

export default AboutPage
