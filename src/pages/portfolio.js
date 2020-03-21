/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import Link from '../components/Link'
import SEO from '../components/Seo'
import BgSmear from '../images/SVGs/BgSmear'

function PortfolioPage({ location }) {
  const data = useStaticQuery(graphql`
    query PortfolioQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allContentfulPortfolio (limit: 4, sort: {fields: createdAt, order: DESC}) {
        nodes {
          slug
          title
          color
          createdAt
          heroImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  `)
  const { title, description } = data.site.siteMetadata
  const entries = data.allContentfulPortfolio.nodes
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`Portfolio - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', mb: 5  }}>Our Portfolio</h1>
          <p sx={{ fontSize: [4,5,6], mb: 0 }}> 
            We'd love to build something amazing with you!
          </p>
          <p sx={{ mb: 7, mt: 4 }}>
            We are {title}, and this is what we do.
          </p>
        </div>
        <div sx={{ variant: 'boxes.cell' , maxWidth: theme => theme.maxWidths.xl }}>
          <div sx={{ display: 'flex',flexDirection: 'column', width: '100%' }}>
            {entries.map((entry, index) => {
              return (
                  <Link
                    key={entry.slug}
                    as={GatsbyLink}
                    to={`/portfolio/${entry.slug}`}
                    from="portfolio-page"
                    sx={{
                      alignSelf: index % 2 === 1 ? 'flex-end' : 'flex-start',
                      color: 'black',
                      mt: index === 0 ? 0 : 10,
                      position: 'relative',
                      width: '60%',
                      '&:hover': {
                        bg: 'transparent',
                        color: 'primary',
                      },
                      '&:hover > .background-smear': {
                        color: 'lime',
                      }
                    }}
                  >
                    <BgSmear className="background-smear" sx={{
                        color: entry.color ? entry.color : 'secondary',
                        height: '115%',
                        left: '-10%',
                        opacity: '0.9',
                        position: 'absolute',
                        top: '-8%',
                        transform: 'rotate(178deg)',
                        width: '120%',
                        zIndex: -1,
                        }}
                    />
                    <h2 sx={{ variant: 'styles.h3', color: 'currentColor' }}>{entry.title}</h2>
                    <Img fluid={entry.heroImage.fluid} alt={entry.title}/>
                  </Link>
                )
              })}
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default PortfolioPage
