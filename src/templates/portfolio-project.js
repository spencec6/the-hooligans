/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import Layout from '../components/Layout'
import Link from '../components/Link'
import LinkSmearYellow from '../images/SVGs/LinkSmearYellow.svg'
import OutboundLink from '../components/OutboundLink'
import SEO from '../components/Seo'

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return (
        <Link
          as={OutboundLink}
          from="testimonial"
          target="_blank"
          to={`${node.data.uri}`}
        >
          {next}
        </Link>
      )
    },
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      return (
        <p sx={{ variant: 'styles.p', fontFamily: 'sans' }}>
          {next}
        </p>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <img
          title={node.data.target.fields.title["en-US"]}
          src={node.data.target.fields.file["en-US"].url}
          sx={{
            display: 'block',
            mx: 'auto',
            my: 4,
          }}
          />
      );
    }
  },
}

export default ({ data }) => {
  const entry = data.project
  return (
    <Layout>
      <SEO
        title={`Portfolio - ${entry.title}`}
        description={entry.slug}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <div sx={{ display: 'inline-block', position: 'relative' }}>
            <h1 sx={{ variant: 'styles.h1', mt: [6,7] }}>{entry.title}</h1>
            <div sx={{
              position: 'absolute',
              width: '120%',
              height: '40%',
              left: '-8%',
              top: '55%',
              transition: 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out',
              transform: 'rotate(1deg)',
              backgroundImage: `url(${LinkSmearYellow})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              zIndex: -1,
            }}>
            </div>
          </div>
          <div sx={{ display: 'flex', flexWrap: 'wrap', my: 3, }}>
            {entry.tags.map((tag, index) => {
              return (
                <div sx={{ 
                  bg: 'lime', 
                  color: 'black', 
                  display: 'inline-block', 
                  fontWeight: 'bold',
                  ml: index === 0 ? 0 : 3,
                  px: 3,
                  variant: 'text.allcaps'
                }}>
                  {tag}
                </div>
              )
            })}
          </div>
          {documentToReactComponents(entry.post.json, options)}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PortfolioEntryBySlug( $slug: String! ) {
    project: contentfulPortfolio(slug: { eq: $slug }) {
      title
      slug
      tags
      heroImage {
        fluid(maxWidth: 1024, quality: 85, resizingBehavior: SCALE) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      post {
        json
      }
    }
  }
`
