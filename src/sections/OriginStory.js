/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { randomize } from '../utils/helpers'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Heading from '../components/Heading'

const getOptions = () => {
  const introOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, next) => {
        return <p sx={{ variant: 'styles.p', fontFamily: 'sans', transform: `rotate(${randomize(-1,1)}deg) translateX(-10px)` }}>{next}</p>
      },
    }
  }
  return introOptions
}

function OriginStorySection({ location }) {
  const data = useStaticQuery(graphql`
    query OriginStoryQuery {
      originStory: contentfulOriginStory {
        title
        slug
        text {
          json
        }
      }
    }
  `)
  const originStory = data.originStory

  return (
    <div>
      <div sx={{ px:4, mb: [9,10], mt: [6,7] }}>
        <div sx={{ variant: 'boxes.cell', maxWidth: theme => theme.maxWidths.lg }}>
          <Heading as="h1" variant="styles.h2" smearColor="secondary" sx={{ color: 'black', mb: 5, mt: [6,7], }}>
            {originStory.title}
          </Heading>
          {documentToReactComponents(originStory.text.json, getOptions())}
        </div>
      </div>
    </div>
  )
}

export default OriginStorySection
