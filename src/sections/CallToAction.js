/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { options } from '../utils/richTextOptions'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg";
import Block from '../components/Block'
import Button from '../components/Button'

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
      callToAction: contentfulCallToAction {
        title
        description {
          json
        }
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
          width={[1,2/3]}
          sx={{
            // justifyContent: 'center'
            px: 0,
            textAlign: 'center'
          }}
        >
          <h1 sx={{ variant: 'styles.h3', color: 'secondary', fontWeight: 'black' }}>
            {callToAction.title}
          </h1>
          <div sx={{ color: 'white', mt: 2 }}>
            {documentToReactComponents(callToAction.description.json, options)}
          </div>
          <Button
              as={GatsbyLink}
              to={`/${callToAction.buttonLink.slug}/`}
              from="header"
              sx={{ variant: 'buttons.secondary', mt: 4 }}
            >
              {callToAction.buttonLink.title}
            </Button>
        </Block>
      </div>
    </section>
  )
}

export default CallToAction