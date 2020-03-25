/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import CallToAction from '../sections/CallToAction'
import Testimonials from '../sections/Testimonials'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

let paragraphIndex = 0
const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      paragraphIndex++;
      return (
        <p sx={{
          variant: 'styles.p',
          fontSize: paragraphIndex === 1 ? [3,4,5] : 'inherit',
          lineHeight: paragraphIndex === 1 ? theme => theme.leading.tight : theme => theme.leading.loose,
          mb: paragraphIndex === 1 ? 6 : 'inherit',
          transform: paragraphIndex === 1 ? 'rotate(-0.5deg)' : ''
        }}>
          {next}
        </p>
      )
    },
  }
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
      logoMark: file(relativePath: { eq: "logo/the-hooligans-logomark-only.png" }) {
        childImageSharp {
          fluid(
            maxWidth: 500,
            quality: 80,
            traceSVG: { color: "#ef336c" }
            ) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      about: contentfulAbout {
        excerpt {
          json
        }
        pageContent {
          json
        }
        slug
        title
      }
    }
  `)
  const { title, description } = data.site.siteMetadata
  const about = data.about
  const bgLogo = data.logoMark.childImageSharp.fluid
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`${about.title} - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7], position: 'relative' }}>
        <div sx={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center', left: 0, position: 'absolute', top: 0, width: '100%', zIndex: -1 }}>
          <div sx={{ maxWidth: theme => theme.maxWidths.md, opacity: 0.1, width: '100%' }}>
            <Img fluid={bgLogo} alt={title}/>
          </div>
        </div>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', color: 'primary', mt: [6,7], mb: 5 }}>
            {about.title}
          </h1>
          {documentToReactComponents(about.pageContent.json, options)}
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
