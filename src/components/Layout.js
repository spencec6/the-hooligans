/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { node } from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import GlobalStyles from './GlobalStyles'
import Footer from '../sections/Footer'
import Header from '../sections/Header'

function Layout({ children, path }) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const { title, description } = data.site.siteMetadata

  return (
    <React.Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description }
        ]}
      >
      </Helmet>
      <GlobalStyles />
      <Header path={path}/>
      <main>{children}</main>
      <Footer path={path}/>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout
