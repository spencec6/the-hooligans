/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'


function IndexPage({ location }) {
  return (
    <Layout path={location.pathname}>
      <Hero/>
      <Services/>
      <Testimonials/>
      <CallToAction/>
    </Layout>
  )
}

export default IndexPage
