/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { randomize } from '../utils/helpers'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import RoundSmear from "-!svg-react-loader!../images/SVGs/round-smear-1.inline.svg";
import Bios from '../sections/Bios'
import CallToAction from '../sections/CallToAction'
// import Testimonials from '../sections/Testimonials'
import Heading from '../components/Heading'
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
            <Heading
              as="p"
              smearColor="lime"
              smearHeight="100%"
              smearLeft="-10%"
              smearTop="10%"
              sx={{
                fontFamily: 'cursive',
                fontSize:[4,5,6],
                lineHeight: theme => theme.leading.tight,
                mb: 6,
                transform: `rotate(${randomize(-2,0.3)}deg) translateX(-10px)`
              }}>
              {next}
            </Heading>
          )
        }
      },
      [BLOCKS.UL_LIST]: (_node, next) => {
        return (
          <ul sx={{ mt: 4, }}>
            {next}
          </ul>
        )
      },
      [BLOCKS.LIST_ITEM]: (_node, next) => {
        return (
          <div sx={{
            alignItems: 'center',
            display: 'flex',
          }}>
            <RoundSmear
              className="about-bulletSmear"
              sx={{
                color: 'primary',
                height: '10px',
                ml: 3,
                transform: `rotate(${randomize(0,360)}deg)`,
                width: '10px',
              }}
            />
            <li
              sx={{
                color: 'primary',
                pl: 3,
              }}
            >
              {next}
            </li>
          </div>
        )
      }
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
      <div sx={{ px:4, mb: [9,10], mt: [6,7], position: 'relative' }}>
        <div sx={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center', left: 0, position: 'absolute', top: 0, width: '100%', zIndex: -1 }}>
          <div sx={{ maxWidth: theme => theme.maxWidths.md, opacity: 0.1, width: '100%' }}>
            <Img fluid={bgLogo} alt={title}/>
          </div>
        </div>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="secondary" sx={{ color: 'black', mb: 5, mt: [6,7], }}>
            {about.title}
          </Heading>
          {documentToReactComponents(about.pageContent.json, getOptions())}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        <CallToAction/>
      </div>
      <Bios/>
    </Layout>
  )
}

export default AboutPage
