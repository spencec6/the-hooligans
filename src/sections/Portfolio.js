/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { options } from '../utils/richTextOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import BorderSmear from "-!svg-react-loader!../images/SVGs/border-smear-1.inline.svg";
import X1 from "-!svg-react-loader!../images/SVGs/x1.inline.svg";
import Heading from '../components/Heading'
import { randomize } from '../utils/helpers'

const Portfolio = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      portfolio: contentfulPortfolio {
        slug
        title
        excerpt {
          json
        }
      }
    }
  `)
  const portfolio = data.portfolio
  const isHome = location === '/';
  return (
    <section sx={{ px:4, my: [8,9,10] }}>
      <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.xl }}>
        {(isHome) ?
          <div>
            <Heading as="h1" variant="styles.h2" smearColor="lime" sx={{ justifyContent: 'center', width: '100%' }}>
              {portfolio.title}
            </Heading>
            <div
              sx={{ 
                variant: 'styles.p',
                mx: 'auto',
                textAlign: isHome ? 'center' : 'left',
                maxWidth: theme => theme.maxWidths.lg,
                width: "100%"
              }}
            >
              {documentToReactComponents(portfolio.excerpt.json, options)}
            </div>
          </div>
        :
          <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
            <Heading as="h1" variant="styles.h2" smearColor="lime" sx={{ color: 'black' }}>
              {portfolio.title}
            </Heading>
            <div sx={{ fontWeight: 'bold', fontFamily: 'cursive', fontSize: [3,4,5], lineHeight: theme => theme.leading.tight, mb: 7, mt: 4 }}>
              {documentToReactComponents(portfolio.excerpt.json, options)}
            </div>
          </div>
        }
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
                transform: `rotate(${randomize(-1,1)}deg)`,
                width: '100%',
              }}
            ></iframe>
          <BorderSmear sx={{
            color: 'lime',
            height: '100%',
            right: '-1%',
            pointerEvents: 'none',
            position: 'absolute',
            top: '-2%',
            transform: 'rotate(0deg)',
            width: '20px',
            zIndex: 1,
            }}
          />
          <BorderSmear sx={{
            color: 'lime',
            height: '185%', // inverse of 54% ratio
            left: '-1%',
            pointerEvents: 'none',
            position: 'absolute',
            top: '1%',
            transform: 'rotate(270deg)',
            transformOrigin: 'top left',
            width: '20px',
            zIndex: 1,
            }}
          />
          <BorderSmear sx={{
            color: 'lime',
            height: '100%',
            left: '-1%',
            pointerEvents: 'none',
            position: 'absolute',
            bottom: '-2%',
            transform: 'rotate(180deg)',
            width: '20px',
            zIndex: 1,
            }}
          />
          <BorderSmear sx={{
            color: 'lime',
            height: '185%', // inverse of 54% ratio
            right: '50%',
            pointerEvents: 'none',
            position: 'absolute',
            top: '7.5%',
            transform: 'rotate(90deg)',
            transformOrigin: '50%',
            width: '20px',
            zIndex: 1,
            }}
          />
          <X1 sx={{
            color: 'primary',
            height: ['75px', '150px'],
            left: '-10%',
            position: 'absolute',
            bottom: '5%',
            transform: 'rotate(0deg)',
            width: ['70px', '140px'],
            zIndex: 2,
            }}
          />
          <X1 sx={{
            color: 'primary',
            height: ['65px', '130px'],
            right: '-8%',
            position: 'absolute',
            bottom: '42%',
            transform: 'rotate(90deg)',
            width: ['56px', '110px'],
            zIndex: 2,
            }}
          />
          <X1 sx={{
            color: 'teal',
            height: ['30px', '60px'],
            right: '3%',
            position: 'absolute',
            bottom: '65%',
            transform: 'rotate(270deg)',
            width: ['35px', '70px'],
            zIndex: 2,
            }}
          />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio