/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import Heading from '../components/Heading'
import { GlitchIn, GlitchRotate } from '../components/Animations'

function Hero() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
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
          flexDirection: 'column',
          justifyContent: 'center',
          mx: [6,6,6,11],
          mt: -5,
          width: '100%'
        }}>
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
            <div sx={{
              display: 'inline-block',
              mt: [6,7,8],
              width: ['90%','80%','80%','55%'],
              }}>
              <Heading
                as="h2"
                smearColor="white"
                smearHeight="100%"
                smearLeft="-10%"
                smearTop="10%"
                sx={{
                  animation: `${GlitchIn} 1s 0.3s forwards step-end, ${GlitchRotate} 20s infinite step-end`,
                  color: 'black',
                  fontFamily: 'cursive',
                  fontSize: [4,5,6],
                  fontWeight: 'bold',
                  lineHeight: theme => theme.leading.tight,
                  mx: 'auto',
                  opacity: 0,
                  textTransform: 'lowercase',
                }}
              >
                {data.site.siteMetadata.description}
              </Heading>
            </div>
        </div>
      </div>
      <div sx={{
        animation: `${GlitchRotate} 6s infinite step-end`,
        color: 'black',
        height: ['100px', '100px', '100px', '200px'],
        left: ['-40px','-10px','-10px'],
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
