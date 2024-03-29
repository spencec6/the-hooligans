/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Img from 'gatsby-image'
import { randomize, orphanKill } from '../utils/helpers'
import RoundSmear1 from "-!svg-react-loader!../images/SVGs/round-smear-1.inline.svg";
import RoundSmear2 from "-!svg-react-loader!../images/SVGs/round-smear-2.inline.svg";
import RoundSmear3 from "-!svg-react-loader!../images/SVGs/round-smear-3.inline.svg";
import Block from '../components/Block'
import Heading from '../components/Heading'
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
        <Heading as="h2" variant="styles.h2" smearColor="secondary" sx={{ justifyContent: 'center', width: '100%' }}>
          {title}
        </Heading>
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
          justifyContent: 'center',
        }}>
          {services.map((service, index) => {
            const RoundSmear = smearComponents[Math.round(randomize(-0.5,2.5))];
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Block
                width={[1,1/2,1/3]}
                key={`service-${service.slug}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  mt: 4,
                  px: 0,
                }}
              >
                <Link
                  bare={true}
                  as={GatsbyLink}
                  to={`/${slug}/#${service.slug}`}
                  sx={{
                    color: 'inherit',
                    display: 'block',
                    fontWeight: 'inherit',
                    px: 6,
                    py: 6,
                    whiteSpace: 'inherit',
                    '&:hover': {
                      bg: 'white',
                      boxShadow: theme => theme.shadows.lg,
                      color: 'inherit',
                    },
                    '&:hover .service-bgSmear': {
                      color: 'lime'
                    },
                    '&:hover .service-heading': {
                      color: 'black',
                      fontFamily: 'cursive',
                      textTransform: 'lowercase',
                    },
                    '&:hover .service-icon': {
                      transform: `scale(1.1) rotate(${randomize(-20,20)}deg)`
                    },
                    '&:hover .service-link': {
                      bg: 'lime',
                      color: 'primary',
                      fontFamily: 'cursive',
                      textTransform: 'lowercase',
                    }
                  }}
                >
                  <div 
                    className="service-icon"
                    sx={{
                      alignItems: 'center',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      position: 'relative',
                      width: "100%"
                    }}>
                    <RoundSmear
                      className="service-bgSmear"
                      sx={{
                        color: 'secondary',
                        cursor: 'pointer',
                        height: '100%',
                        position: 'absolute',
                        transform: `rotate(${randomize(0,360)}deg)`,
                        width: '100%',
                        zIndex: 0,
                      }}
                    />
                    <Img
                      alt={service.title}
                      fixed={service.icon.fixed}
                      sx={{
                        transform: `rotate(${randomize(-8,8)}deg)`,
                        pointerEvents: 'none'
                        }}
                      />
                  </div>
                  <Heading classes="service-heading" as="h3" variant="styles.h6" smear={false} smearColor="secondary" sx={{ justifyContent: 'center', width: '100%', textAlign: 'center' }}>
                    {service.title}
                  </Heading>
                  <p sx={{ fontSize: [1,2,2], fontFamily: 'sans', textAlign: 'center', }}>
                    {orphanKill(service.excerpt)}
                    </p>
                  <div sx={{textAlign: 'center', mt: 4, variant: 'text.allcaps' }}>
                    <div className="service-link" sx={{ fontSize: [1,2], variant: 'styles.links.link', display: 'inline-block' }}>
                      Read More...
                    </div>
                  </div>
                </Link>
              </Block>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services