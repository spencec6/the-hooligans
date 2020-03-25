/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import { randomize } from '../utils/helpers'
import RoundSmear1 from "-!svg-react-loader!../images/SVGs/round-smear-1.inline.svg";
import RoundSmear2 from "-!svg-react-loader!../images/SVGs/round-smear-2.inline.svg";
import RoundSmear3 from "-!svg-react-loader!../images/SVGs/round-smear-3.inline.svg";
import { GlitchRotate } from '../components/Animations'
import Block from '../components/Block'
import Link from '../components/Link'

const smearComponents = [
  RoundSmear1,
  RoundSmear2,
  RoundSmear3
]

const Services = () => {
  const data = useStaticQuery(graphql`
    query {
      serviceContent: contentfulServices {
        title
        slug
        introduction
        services {
          slug
          title
          excerpt
          icon {
            fixed(width: 150, quality: 50) {
              ...GatsbyContentfulFixed_tracedSVG
            }
          }
        }
      }
    }
  `)
  const {title, slug, introduction, services} = data.serviceContent
  return (
    <section sx={{ px:4, my: [8,9,10] }}>
      <div sx={{ variant: 'boxes.cell' }}>
        <h1 sx={{ variant: 'styles.h2', textAlign: 'center' }}>
          {title}
        </h1>
        <p
          sx={{ 
            variant: 'styles.p',
            mx: 'auto',
            textAlign: 'center',
            maxWidth: theme => theme.maxWidths.lg,
            width: "100%"
          }}
        >
          {introduction}
        </p>
        <div sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {services.map((service, index) => {
            const RoundSmear = smearComponents[Math.round(randomize(-0.5,2.5))];
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Block width={(index > 3) ? [1,1/3,1/3] : [1,1/4,1/4]} key={`service-${service.slug}`} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 7 }}>
                <div sx={{ alignItems: 'center', display: 'inline-flex', justifyContent: 'center', position: 'relative', width: "100%"}}>
                  <RoundSmear
                    sx={{
                      color: 'secondary',
                      height: '100%',
                      position: 'absolute',
                      transform: `rotate(${randomize(0,360)}deg)`,
                      width: '100%',
                      zIndex: 0,
                    }}
                  />
                  <Img alt={service.title} fixed={service.icon.fixed} sx={{ animation: `${GlitchRotate} ${(index+1) * randomize(3,15)}s infinite step-end`,}}/>
                </div>
                <h3 sx={{ variant: 'styles.h6', color: 'primary', mt: 3, textAlign: 'center' }}>{service.title}</h3>
                <p sx={{ fontSize: [1,2,2], fontFamily: 'sans', textAlign: 'center' }}>{service.excerpt}</p>
                <div sx={{textAlign: 'center', mt: 4, variant: 'text.allcaps' }}>
                  <Link as={GatsbyLink} to={`/${slug}/#${service.slug}`} sx={{ fontSize: [1,2] }}>
                    Read More...
                  </Link>
                </div>
              </Block>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services