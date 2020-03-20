/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery, Link as GatsbyLink } from 'gatsby'
import Block from '../components/Block'
import Button from '../components/Button'

const CallToAction = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const title = data.site.siteMetadata.title
  return (
    <section
      id="call-to-action"
      sx={{
        bg: 'teal',
        width: "100%",
        px: 4,
        py: [10,11],
      }}
    >
      <div 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          variant: 'boxes.cell',
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
          <h1 sx={{ variant: 'styles.h3', color: 'black', fontWeight: 'black' }}>
            Ready to put your campaign into overdrive?
          </h1>
          <p sx={{ color: 'black', mt: 2 }}>
            Create the campaign you've always dreamed about with {title} by your side at every step along the way.
          </p>
          <Button
              as={GatsbyLink}
              to="/contact/"
              from="header"
              sx={{ variant: 'buttons.primary', mt: 4 }}
            >
              Contact Us
            </Button>
        </Block>
      </div>
    </section>
  )
}

export default CallToAction