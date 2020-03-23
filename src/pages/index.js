/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'
import UnderConstruction from '../sections/UnderConstruction'


function IndexPage({ location }) {
  return (
    <Layout path={location.pathname}>
      <UnderConstruction/>
    </Layout>
  )
}

export default IndexPage
