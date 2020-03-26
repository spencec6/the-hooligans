/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import Block from '../components/Block'
import { GlitchRotate } from '../components/Animations'
import { randomize } from '../utils/helpers'

function Hero() {
  const data = useStaticQuery(graphql`
    query {
      logoMark: file(relativePath: { eq: "logo/the-hooligans-logomark.png" }) {
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
      xMark1: file(relativePath: { eq: "x1.png" }) {
        childImageSharp {
          fluid(
            maxWidth: 210,
            quality: 20,
            traceSVG: { color: "#252627" }
            ) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      xMark2: file(relativePath: { eq: "x2.png" }) {
        childImageSharp {
          fluid(
            maxWidth: 200,
            quality: 20,
            traceSVG: { color: "#252627" }
            ) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  const { logoMark, xMark1, xMark2 } = data
  return (
    <div sx={{ px: [6,8,10], position: 'relative' }}>
      <div sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: ['70vh','80vh'],
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
        <div sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          // flexDirection: 'row-reverse',
          mx: [6,6,6,11],
          mt: -5,
        }}>
          <Block width={[1,1,1,1/2]}>
            <Img 
              fluid={logoMark.childImageSharp.fluid}
              alt="The Hooligans"
              sx={{
                animation: `${GlitchRotate} 20s infinite step-end`,
                display: 'block',
                mx: 'auto',
                mt: 5,
                maxWidth: '500px',
                width: "100%",
                zIndex: 1
              }}/>
          </Block>
          <Block width={[1,1,1,1/2]}>
            <div sx={{
              animation: `${GlitchRotate} 30s infinite step-end`,
              transform: `rotate(${randomize(-4,4)}deg) translate(${randomize(-2,2)}px, ${randomize(-2,2)}px)`,
              mt: 5,
              }}>
              <h2 sx={{
                display: 'inline',
                width: ['100%','100%','100%','80%'],
                variant: 'styles.h3',
                color: 'black',
                letterSpacing: -1,
                lineHeight: 1.15,
                // textAlign: 'center',
                fontWeight: 'black',
                mt: 6,
              }}>
                <span sx={{ bg: 'white' }}>
                  Uniquely poised to meet the challenges and demands of the moment
                </span>
              </h2>
            </div>
          </Block>
        </div>
      </div>
      <div sx={{
        animation: `${GlitchRotate} 6s infinite step-end`,
        color: 'black',
        height: ['100px', '100px', '100px', '200px'],
        left: '-10px',
        position: 'absolute',
        bottom: '15vmin',
        width: ['100px', '100px', '100px', '200px'],
        zIndex: 2,
      }}>
        <Img fluid={xMark1.childImageSharp.fluid} alt="" />
      </div>
      <div sx={{
        animation: `${GlitchRotate} 9s infinite step-end`,
        color: 'black',
        height: ['60px', '60px', '60px', '120px'],
        left: '-30px',
        position: 'absolute',
        bottom: '2vmin',
        width: ['60px', '60px', '60px', '120px'],
        zIndex: 2,
      }}>
        <Img fluid={xMark2.childImageSharp.fluid} alt="" />
      </div>
      <div sx={{
        animation: `${GlitchRotate} 14s infinite step-end`,
        color: 'black',
        height: ['80px', '80px', '80px', '160px'],
        right: '20px',
        position: 'absolute',
        top: '16vmin',
        width: ['80px', '80px', '80px', '160px'],
        zIndex: 2,
      }}>
        <Img fluid={xMark1.childImageSharp.fluid} alt="" />
      </div>
    </div>
  )
}

export default Hero
