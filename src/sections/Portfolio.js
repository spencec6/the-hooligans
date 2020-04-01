/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import BorderSmear from "-!svg-react-loader!../images/SVGs/border-smear-1.inline.svg";
import X1 from "-!svg-react-loader!../images/SVGs/x1.inline.svg";
import Exclamation from "-!svg-react-loader!../images/SVGs/exclamation-mark.inline.svg";
// import Question from "-!svg-react-loader!../images/SVGs/question-mark.inline.svg";
import Heading from '../components/Heading'
import { randomize } from '../utils/helpers'

const Portfolio = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      portfolio: contentfulPortfolio {
        slug
        title
        excerpt
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
              {portfolio.excerpt}
            </div>
          </div>
        :
          <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
            <Heading as="h1" variant="styles.h2" smearColor="secondary" sx={{ color: 'black', mb: 3 }}>
              {portfolio.title}
            </Heading>
            <Heading
              smearColor="lime"
              smearHeight="100%"
              smearLeft="-10%"
              smearTop="10%"
              sx={{
                fontFamily: 'cursive',
                fontSize:[4,5,5],
                lineHeight: theme => theme.leading.tight,
                mb: 8,
                transform: `rotate(${randomize(-2,0.3)}deg) translateX(-10px)`
              }}
            >
              {portfolio.excerpt}
            </Heading>
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
              src="https://www.youtube.com/embed/f2tBRtxNAoM?rel=0"
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
            right: ['-3%','-1%'],
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
            top: ['4%','1%'],
            transform: 'rotate(270deg)',
            transformOrigin: 'top left',
            width: '20px',
            zIndex: 1,
            }}
          />
          <BorderSmear sx={{
            color: 'lime',
            height: '100%',
            left: ['-3%','-1%'],
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
            right: ['45%','50%'],
            pointerEvents: 'none',
            position: 'absolute',
            top: '7.5%',
            transform: 'rotate(90deg)',
            transformOrigin: '50%',
            width: '20px',
            zIndex: 1,
            }}
          />
          <Exclamation sx={{
            color: 'primary',
            height: ['75px', '150px'],
            left: ['1%','1%','1%','1%','-3%'],
            position: 'absolute',
            bottom: '5%',
            transform: 'rotate(0deg)',
            width: ['25px', '50px'],
            zIndex: 2,
            }}
          />
          <X1 sx={{
            color: 'primary',
            height: ['65px', '130px'],
            right: ['-5%','-5%','-5%','-4%','-8%'],
            position: 'absolute',
            bottom: '36%',
            transform: 'rotate(273deg)',
            width: ['56px', '110px'],
            zIndex: 2,
            }}
          />
          <Exclamation sx={{
            color: 'teal',
            height: ['50px', '100px'],
            right: '3%',
            position: 'absolute',
            bottom: '65%',
            transform: 'rotate(7deg)',
            width: ['17px', '35px'],
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