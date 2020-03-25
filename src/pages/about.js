/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { randomize } from '../utils/helpers'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import CallToAction from '../sections/CallToAction'
import Testimonials from '../sections/Testimonials'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const getOptions = () => {
  let paragraphIndex = 0
  const introOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, next) => {
        paragraphIndex++
        if(paragraphIndex > 1) {
          return <p sx={{ variant: 'styles.p' }}>{next}</p>
        } else {
          return (
            <p sx={{
              variant: 'styles.p',
              display: 'inline-block',
              fontSize:[4,5,6],
              fontWeight: 'bold',
              lineHeight: theme => theme.leading.tight,
              mb: 3,
              px: 2,
              transform: `rotate(${randomize(-1.2,0.3)}deg) translateX(-10px)`
            }}>
              <span sx={{
                bg: 'lime',
                color: 'primary',
               }}>
                 {next}
              </span>
            </p>
          )
        }
      },
    }
  }
  return introOptions
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
          <h1 sx={{ variant: 'styles.h2', mt: [6,7], mb: 5 }}>
            {about.title}
          </h1>
          {documentToReactComponents(about.pageContent.json, getOptions())}
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
