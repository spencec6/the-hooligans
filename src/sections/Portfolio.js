/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { options } from '../utils/richTextOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
// import Sizzler from '../assets/sizzler.mp4'

const Portfolio = () => {
  const data = useStaticQuery(graphql`
    query {
      portfolio: contentfulPortfolio {
        slug
        title
        pageContent {
          json
        }
        excerpt {
          json
        }
      }
    }
  `)
  const portfolio = data.portfolio
  return (
    <section sx={{ px:4, my: [8,9,10] }}>
      <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.xl }}>
        <h1 sx={{ variant: 'styles.h2', textAlign: 'center' }}>
          {portfolio.title}
        </h1>
        <div
          sx={{ 
            variant: 'styles.p',
            mx: 'auto',
            textAlign: 'center',
            maxWidth: theme => theme.maxWidths.lg,
            width: "100%"
          }}
        >
          {documentToReactComponents(portfolio.excerpt.json, options)}
        </div>
        <div sx={{
          position: 'relative',
          }}
        >
          <BgSmear sx={{
            color: 'lime',
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
          <div sx={{
            display: 'block',
            height: 0,
            mt: [4,5,6],
            mx: 'auto',
            position: 'relative',
            pb: '54%',
          }}>
            {/* <video controls sx={{ height: 'auto', width: '100%' }}>
              <source src={Sizzler} type="video/mp4" />
            </video> */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iJOeMDsnJWI"
              frameBorder="0"
              title="sizzler"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              sx={{
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio