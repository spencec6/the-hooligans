/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import BgSmear from '../images/SVGs/BgSmear'
import X1 from '../images/SVGs/X1'
import { GlitchRotate } from '../components/Animations'

function Hero() {
  const data = useStaticQuery(graphql`
    query {
      logoMark: file(relativePath: { eq: "logo/the-hooligans-logomark.png" }) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 80) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      xMark1: file(relativePath: { eq: "SVGs/x-element.svg" }) {
        childImageSharp {
          fluid(maxWidth: 200, quality: 50) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
        extension
        publicURL
      }
    }
  `)
  const { logoMark, xMark1 } = data
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
        <Img 
          fluid={logoMark.childImageSharp.fluid}
          alt="The Hooligans"
          sx={{
            animation: `${GlitchRotate} 20s infinite step-end`,
            display: 'block',
            mx: 'auto',
            maxWidth: '500px',
            width: "60vw",
            zIndex: 1
          }}/>
      </div>
      <img
        src={xMark1.publicURL}
        alt=""
        sx={{
          animation: `${GlitchRotate} 6s infinite step-end`,
          color: 'black',
          height: ['100px', '100px', '100px', '200px'],
          left: '-10px',
          position: 'absolute',
          bottom: '15vmin',
          width: ['100px', '100px', '100px', '200px'],
          zIndex: 2,
        }} />
      <X1
        fill="currentColor"
        sx={{
          animation: `${GlitchRotate} 9s infinite step-end`,
          color: 'black',
          height: ['60px', '60px', '60px', '120px'],
          left: '-30px',
          position: 'absolute',
          bottom: '2vmin',
          width: ['60px', '60px', '60px', '120px'],
          zIndex: 2,
        }}
      />
      <X1
        fill="currentColor"
        sx={{
          animation: `${GlitchRotate} 14s infinite step-end`,
          color: 'black',
          height: ['80px', '80px', '80px', '160px'],
          right: '20px',
          position: 'absolute',
          top: '16vmin',
          width: ['80px', '80px', '80px', '160px'],
          zIndex: 2,
        }}
      />
    </div>
  )
}

export default Hero
