/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from '../components/Layout'
import Hero from '../sections/Hero'
import Portfolio from '../sections/Portfolio'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import CallToAction from '../sections/CallToAction'


function IndexPage({ location }) {
  return (
    <Layout path={location.pathname}>
      <Hero/>
      <Portfolio/>
      <Services/>
      <Testimonials/>
      <CallToAction/>
    </Layout>
  )
}

export default IndexPage
