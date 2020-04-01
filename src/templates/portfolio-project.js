/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { options } from '../utils/richTextOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Icon from '../components/Icon'
import Layout from '../components/Layout'
import Link from '../components/Link'
import LinkSmearYellow from '../images/SVGs/LinkSmearYellow.svg'
import SEO from '../components/Seo'

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
            <Link
              as={GatsbyLink}
              bare={true}
              to="/portfolio"
              from={`portfolio-${entry.title}`}
              sx={{ 
                color: 'primary',
                fontSize: [0,1],
                mt: [6,7],
                variant: 'text.allcaps',
               }}>
                 <Icon name="arrow-left" width="18px" height="18px" sx={{ mr: 2, }}/>
                 Back to Portfolio
              </Link>
            <h1 sx={{ variant: 'styles.h1', mt: 2 }}>{entry.title}</h1>
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
          <div sx={{ display: 'flex', flexWrap: 'wrap', my: 5, }}>
            {entry.tags.map((tag, index) => {
              return (
                <div key={tag.replace(" ", "_")} sx={{ 
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
    project: contentfulPortfolioProject(slug: { eq: $slug }) {
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
