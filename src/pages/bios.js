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
// import Testimonials from '../sections/Testimonials'
import { GlitchRotate } from '../components/Animations'
import Block from '../components/Block'
import Heading from '../components/Heading'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg"

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
            <Heading
              as="p"
              smearColor="lime"
              smearHeight="100%"
              smearLeft="-10%"
              smearTop="10%"
              sx={{
                fontFamily: 'cursive',
                fontSize:[4,5,6],
                lineHeight: theme => theme.leading.tight,
                mb: 6,
                transform: `rotate(${randomize(-2,0.3)}deg) translateX(-10px)`
              }}>
              {next}
            </Heading>
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
      bios: allContentfulBios(sort: {fields: displayOrder, order: ASC}) {
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

  const colors = ['primary', 'secondary', 'lime', 'teal', 'black']

  return (
    <Layout path={location.pathname}>
      <SEO
        title={`${bioPage.title} - ${title}`}
        description={description}
      />
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="teal" sx={{ color: 'black', mb: 5, mt: [6,7], }}>
            {bioPage.title}
          </Heading>
          {documentToReactComponents(bioPage.introduction.json, getOptions())}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        {bios.map((bio, index) => {
          const bioPortrait = isHovering === bio.id && bio.teenPortrait ? bio.teenPortrait.fluid : bio.portrait.fluid
          return (
            <div key={bio.name} sx={{ px:4, py: [3,5], }}>
              <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
                <div sx={{ display: 'flex', flexWrap: 'wrap', mx: -5, my: [5,6] }}>
                  <Block width={[1,1/2, 1/3]} sx={{ px: 6 }}>
                    <div
                      role="button"
                      onMouseOver={() => {setIsHovering(bio.id)}}
                      onMouseOut={() => {setIsHovering(0)}}
                      onFocus={() => {setIsHovering(bio.id)}}
                      onBlur={() => {setIsHovering(0)}}
                      tabIndex={0}
                      sx={{position: 'relative'}}
                    >
                      <Img
                        loading="eager"
                        fluid={bioPortrait}
                        alt={bio.name}
                        sx={{
                          animation: `${GlitchRotate} ${(index+1) * 15}s infinite step-end`,
                          opacity: 0.9,
                          '&:hover': {
                            opacity: 1
                          }
                        }}
                      />
                      <BgSmear sx={{
                        color: colors[index+1],
                        height: '130%',
                        left: '-15%',
                        position: 'absolute',
                        top: '-15%',
                        transform: `rotate(${randomize(-4,4)}deg)`,
                        width: '130%',
                        zIndex: -1,
                        }}
                      />
                    </div>
                    <div sx={{ variant: 'styles.h6', fontWeight: 'black', mb: 1, mt: 4, }}>{bio.name}</div>
                    <div sx={{ display: 'inline-block', bg: 'lime', color: 'primary', fontWeight: 'bold', px: 3, textTransform: 'uppercase' }}>{bio.title}</div>
                  </Block>
                  <Block width={[1,1/2, 2/3]} sx={{ px: 6 }}>
                    {documentToReactComponents(bio.biography.json, options)}
                  </Block>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div sx={{ mt: [6,7] }}>
        <CallToAction/>
      </div>
    </Layout>
  )
}

export default BiosPage
