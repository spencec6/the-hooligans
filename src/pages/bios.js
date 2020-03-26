/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { randomize } from '../utils/helpers'
import Img from 'gatsby-image'
import { BLOCKS } from '@contentful/rich-text-types'
import { options } from '../utils/richTextOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import CallToAction from '../sections/CallToAction'
import Testimonials from '../sections/Testimonials'
import { GlitchRotate } from '../components/Animations'
import Block from '../components/Block'
import Layout from '../components/Layout'
import SEO from '../components/Seo'

const getOptions = () => {
  let paragraphIndex = 0
  const introOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, next) => {
        paragraphIndex++
        if(paragraphIndex > 1) {
          return <p sx={{ variant: 'styles.p' }}>{next}</p>
        } else {
          return (
            <p sx={{
              variant: 'styles.p',
              display: 'inline-block',
              fontSize:[4,5,6],
              fontWeight: 'bold',
              lineHeight: theme => theme.leading.tight,
              mb: 3,
              px: 2,
              transform: `rotate(${randomize(-1.2,0.3)}deg) translateX(-10px)`
            }}>
              <span sx={{
                bg: 'lime',
                color: 'primary',
               }}>
                 {next}
                </span>
            </p>
          )
        }
      },
    }
  }
  return introOptions
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
      bios: allContentfulBios(sort: {fields: createdAt, order: ASC}) {
        nodes {
          title
          name
          id
          portrait {
            fluid(
              maxHeight: 385,
              maxWidth: 385,
              quality: 50,
              ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          teenPortrait {
            fluid(
              maxHeight: 385,
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

  const [isHovering, setIsHovering] = useState(0); 

  return (
    <Layout path={location.pathname}>
      <SEO
        title={`${bioPage.title} - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <h1 sx={{ variant: 'styles.h2', mt: [6,7], mb: 5 }}>
            {bioPage.title}
          </h1>
            {documentToReactComponents(bioPage.introduction.json, getOptions())}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        {bios.map((bio, index) => {
          const bioPortrait = isHovering === bio.id && bio.teenPortrait ? bio.teenPortrait.fluid : bio.portrait.fluid
          return (
            <div key={bio.name} sx={{ px:4, py: [3,5], }}>
              <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
                <div sx={{ display: 'flex', flexWrap: 'wrap', mx: -4, my: [5,6] }}>
                  <Block width={[1,1/2, 1/3]}>
                    <div
                      role="button"
                      onMouseOver={() => {setIsHovering(bio.id)}}
                      onMouseOut={() => {setIsHovering(0)}}
                      onFocus={() => {setIsHovering(bio.id)}}
                      onBlur={() => {setIsHovering(0)}}
                      tabIndex={0}
                      sx={{ animation: `${GlitchRotate} ${(index+1) * 15}s infinite step-end`, }}
                    >
                      <Img
                        fluid={bioPortrait}
                        alt={bio.name}
                      />
                    </div>
                    <div sx={{ variant: 'styles.h6', fontWeight: 'black', mb: 1, mt: 4, }}>{bio.name}</div>
                    <div sx={{ variant: 'text.allcaps', display: 'inline-block', bg: 'lime', color: 'primary', fontWeight: 'bold', px: 3, }}>{bio.title}</div>
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
