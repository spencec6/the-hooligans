/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { randomize } from '../utils/helpers'
import Img from 'gatsby-image'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
// import Testimonials from '../sections/Testimonials'
import { GlitchRotate } from '../components/Animations'
import Block from '../components/Block'
import Heading from '../components/Heading'
import BgSmear from "-!svg-react-loader!../images/SVGs/smear.inline.svg"
// import HoverArrow from "-!svg-react-loader!../images/SVGs/bio-hover-arrow.svg"

const getOptions = (color) => {
  let paragraphIndex = 0
  const introOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, next) => {
        paragraphIndex++
        if(color) {
          return <p sx={{ fontFamily: 'sans', transform: `rotate(${randomize(-2,2)}deg)`, mt: 4, position: 'relative' }}>
            <BgSmear sx={{
              color: color,
              height: '120%',
              left: `${randomize(-12,-7)}%`,
              position: 'absolute',
              top: '-5%',
              width: `${randomize(115,120)}%`,
              transform: `rotate(${Math.round(randomize(0,1))*180}deg)`,
              zIndex: -1,
              }}
            />
            {next}
            </p>
        }
        if(paragraphIndex > 1) {
          return <p sx={{ variant: 'styles.p' }}>{next}</p>
        } else {
          return (
            <Heading
              as="p"
              smearColor="lime"
              smearHeight="100%"
              smearLeft="-10%"
              smearTop="5%"
              sx={{
                fontFamily: 'cursive',
                fontSize:[4,5,5],
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

const colors = ['primary', 'secondary', 'lime', 'teal', 'black']

function BiosPage({ location }) {
  const data = useStaticQuery(graphql`
    query BiosQuery {
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
  const bioPage = data.bioPage
  const bios = data.bios.nodes

  return (
    <div>
      <div sx={{ px:4, mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="secondary" sx={{ color: 'black', mb: 5, mt: [6,7], }}>
            {bioPage.title}
          </Heading>
          {documentToReactComponents(bioPage.introduction.json, getOptions())}
        </div>
      </div>
      <div sx={{ mt: [6,7] }}>
        {bios.map((bio, index) => {
          // const bioPortrait = isHovering === bio.id && bio.teenPortrait ? bio.teenPortrait.fluid : bio.portrait.fluid
          return (
            <div key={bio.name} sx={{ px:4, py: [3,5], }}>
              <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
                <div sx={{ display: 'flex', flexWrap: 'wrap', mx: -5, my: [5,6] }}>
                  <Block width={[1,1/2, 1/3]} sx={{ px: 6 }}>
                    <BioImage bio={bio} index={index}/>
                    <div sx={{ variant: 'text.allcaps', fontFamily: 'sans', fontSize: [6,5], fontWeight: 'black', mb: 1, mt: [8,4], }}>{bio.name}</div>
                    <div sx={{ display: 'inline-block', bg: 'lime', color: 'primary', fontFamily: 'cursive', fontSize: [5,2], fontWeight: 'bold', px: 1, textTransform: 'lowercase' }}>{bio.title}</div>
                  </Block>
                  <Block width={[1,1/2, 2/3]} sx={{ px: 6 }}>
                    {documentToReactComponents(bio.biography.json, getOptions(colors[index+1]))}
                  </Block>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BioImage({bio, image, index, ...props}) {
  const [isHovering, setIsHovering] = useState(0); 
  return (
    <div
      role="button"
      onMouseOver={() => setIsHovering(1)}
      onMouseOut={() => setIsHovering(0)}
      onFocus={() => setIsHovering(1)}
      onBlur={() => setIsHovering(0)}
      tabIndex={0}
      sx={{position: 'relative', '&:focus': { outline: 'none' }}}
    >
      <Img
        loading="eager"
        fluid={isHovering ? bio.teenPortrait.fluid : bio.portrait.fluid}
        alt={bio.name}
        sx={{
          animation: `${GlitchRotate} ${(index+1) * 15}s infinite step-end`,
          opacity: 0.9,
          '&:hover': {
            opacity: 1
          }
        }}
        {...props}
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
      {/* <HoverArrow sx={{
        animation: isHovering ? null : `${Blink} 12s ${(index+1) * 0.2}s infinite linear forwards`,
        height: 'auto',
        left: '-45%',
        opacity: '0',
        position: 'absolute',
        top: `${randomize(40,80)}%`,
        transform: `rotate(${randomize(-15,15)}deg)`,
        width: '82px',
        }}
      /> */}
    </div>
  )
}

export default BiosPage
