/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { options } from '../utils/richTextOptions'
import CallToAction from '../sections/CallToAction'
import Testimonials from '../sections/Testimonials'
import { GlitchRotate } from '../components/Animations'
import Block from '../components/Block'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

export const introOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, next) => {
      return (
        <p sx={{ variant: 'styles.p', fontSize: [3,4,5], lineHeight: theme => theme.leading.tight }}>
          {next}
        </p>
      )
    },
  }
}

function BiosPage({ location }) {
  const data = useStaticQuery(graphql`
    query BiosQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      bioPage: contentfulBioPage {
        title
        slug
        introduction {
          json
        }
      }
      bios: allContentfulBios {
        nodes {
          title
          name
          portrait {
            fluid(
              maxWidth: 385,
              quality: 50,
              ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          biography {
            json
          }
        }
      }
    }
  `)
  const { title, description } = data.site.siteMetadata
  const bioPage = data.bioPage
  const bios = data.bios.nodes
  return (
    <Layout path={location.pathname}>
      <SEO
        title={`${bioPage.title} - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', color: 'primary', mt: [6,7], mb: 5 }}>
            {bioPage.title}
          </h1>
            {documentToReactComponents(bioPage.introduction.json, introOptions)}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        {bios.map((bio, index) => {
          return (
            <div key={bio.name} sx={{ px:4, py: [3,5], }}>
              <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
                <div sx={{ display: 'flex', flexWrap: 'wrap', mx: -4, my: [5,6] }}>
                  <Block width={[1,1/2, 1/3]}>
                    <div sx={{ animation: `${GlitchRotate} ${(index+1) * 15}s infinite step-end`, }}>
                      <Img fluid={bio.portrait.fluid} alt={bio.name}/>
                    </div>
                    <div sx={{ variant: 'styles.h6', mb: 1, mt: 4, }}>{bio.name}</div>
                    <div sx={{ variant: 'text.allcaps', display: 'inline-block', bg: 'lime', color: 'black', px: 3, }}>{bio.title}</div>
                  </Block>
                  <Block width={[1,1/2, 2/3]} sx={{ }}>
                    {documentToReactComponents(bio.biography.json, options)}
                  </Block>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div sx={{ mt: [6,7] }}>
        <Testimonials/>
        <CallToAction/>
      </div>
    </Layout>
  )
}

export default BiosPage
