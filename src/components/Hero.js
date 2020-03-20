/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import LogoMark from '../images/logo/the-hooligans-logomark.png'
import BgSmear from '../images/SVGs/BgSmear'
import X1 from '../images/SVGs/X1'

function Hero() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)
  return (
    <div sx={{ px: [6,8,10], position: 'relative' }}>
      <div sx={{
        // bg: 'secondary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        mx: 'auto',
        position: 'relative',
        width: "100%",
        }}
      >
        <BgSmear sx={{
          color: 'secondary',
          height: '110%',
          left: '-5%',
          opacity: '0.9',
          position: 'absolute',
          top: '-2%',
          width: '110%',
          zIndex: -1,
          }}
        />
        <img src={LogoMark} sx={{ display: 'block', mx: 'auto', maxWidth: '500px', width: "60vw", zIndex: 1}}/>
      </div>
      <X1
        fill="currentColor"
        sx={{
          color: 'black',
          height: ['100px', '100px', '100px', '200px'],
          left: '-10px',
          position: 'absolute',
          bottom: '15vmin',
          width: ['100px', '100px', '100px', '200px'],
          zIndex: 2,
        }}
      />
      <X1
        fill="currentColor"
        sx={{
          color: 'black',
          height: ['60px', '60px', '60px', '120px'],
          left: '-30px',
          position: 'absolute',
          bottom: '2vmin',
          transform: 'rotate(193deg)',
          width: ['60px', '60px', '60px', '120px'],
          zIndex: 2,
        }}
      />
      <X1
        fill="currentColor"
        sx={{
          color: 'black',
          height: ['80px', '80px', '80px', '160px'],
          right: '20px',
          position: 'absolute',
          top: '16vmin',
          transform: 'rotate(71deg)',
          width: ['80px', '80px', '80px', '160px'],
          zIndex: 2,
        }}
      />
    </div>
  )
}

export default Hero
