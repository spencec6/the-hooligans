/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import Block from '../components/Block'
import Button from '../components/Button'

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      return (
        <p
          sx={{
            color: 'white',
            fontFamily: 'cursive',
            fontSize:[3,4,5],
            fontWeight: 'book',
            lineHeight: '150%',
            textTransform: 'lowercase',
            '& b': {
              color: 'secondary',
              fontFamily: 'sans',
              fontSize:[6,7,8],
              fontWeight: 'black',
              variant: 'text.allcaps'
            }
          }}>
          {next}
        </p>
      )
    }
  }
}

const CallToAction = () => {
  const data = useStaticQuery(graphql`
    query {
      mobileBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 768, quality: 60) {
            src
          }
        }
      }
      desktopBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1024, quality: 60) {
            src
          }
        }
      }
      exclaimLime: file(relativePath: { eq: "exclaim-lime.png" }) {
        childImageSharp {
          fluid(
            maxWidth: 30,
            quality: 20,
            traceSVG: { color: "#D4FF59" }
            ) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      questionMark: file(relativePath: { eq: "question-mark.png" }) {
        childImageSharp {
          fluid(
            maxWidth: 30,
            quality: 20,
            traceSVG: { color: "#252627" }
            ) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      callToAction: contentfulCallToAction {
        title {
          json
        }
        subhead
        buttonLink {
          slug
          title
        }
      }
    }
  `)
  const { mobileBg, desktopBg } = data
  const callToAction = data.callToAction
  return (
    <section
      id="call-to-action"
      sx={{
        backgroundBlendMode: 'multiply',
        backgroundColor: 'primary',
        backgroundImage: [`url(${mobileBg.childImageSharp.fluid.src})`, `url(${desktopBg.childImageSharp.fluid.src})`],
        width: "100%",
        position: 'relative',
        px: 4,
        py: [10,11],
      }}
    >
    <BgSmear sx={{
        color: 'primary',
        height: 'calc(100% + 60px)',
        position: 'absolute',
        top: '-30px',
        transform: 'rotate(-1deg)',
        left: '-15vw',
        width: '130vw',
        zIndex: 1,
        }}
      />
      <div sx={{
        height: 'auto',
        right: '10%',
        position: 'absolute',
        top: '-15%',
        transform: 'rotate(8deg)',
        width: '40px',
        zIndex: 2,
      }}>
        <Img 
          alt=""
          fluid={data.questionMark.childImageSharp.fluid}
        />
      </div>
      <div sx={{
        height: 'auto',
        left: '3%',
        position: 'absolute',
        bottom: '-15%',
        transform: 'rotate(-4deg)',
        width: '30px',
        zIndex: 2,
      }}>
        <Img 
          alt=""
          fluid={data.exclaimLime.childImageSharp.fluid}
        />
      </div>
      <div 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          variant: 'boxes.cell',
          zIndex: 2
        }}
      >
        <Block
          width={[1,1,1,2/3]}
          sx={{
            // justifyContent: 'center'
            px: 0,
            textAlign: 'center'
          }}
        >
          <h1 sx={{ variant: 'styles.h4', color: 'secondary', fontWeight: 'black' }}>
            {documentToReactComponents(callToAction.title.json, options)}
          </h1>
          <Button
              as={GatsbyLink}
              to={`/${callToAction.buttonLink.slug}/`}
              from="header"
              sx={{ variant: 'buttons.secondary', mt: 4 }}
            >
              {callToAction.subhead}
            </Button>
        </Block>
      </div>
    </section>
  )
}

export default CallToAction