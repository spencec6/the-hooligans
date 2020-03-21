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
      <div sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <div sx={{ flexGrow: 1 }}>
          <Header path={path}/>
          <main>{children}</main>
        </div>
        <Footer path={path} sx={{ flexShrink: 0 }}/>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: node.isRequired,
}

export default Layout
