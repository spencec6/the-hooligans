import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

function SEO({ description, lang, image, meta, title, pathname }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
        description || data.site.siteMetadata.description
        const canonical = pathname
        ? `${data.site.siteMetadata.siteUrl}${pathname}`
        : null
        const metaImage = image && image.src ? `${image.src}` : null
        const metaUrl = `${data.site.siteMetadata.siteUrl}${pathname}`
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s`} // | ${data.site.siteMetadata.title}`}
            link={
              canonical
                ? [
                    {
                      rel: "canonical",
                      href: canonical,
                    },
                  ]
                : []
            }
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:url`,
                content: metaUrl,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:creator`,
                content: `@${data.site.siteMetadata.social.twitter.url}`,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: 'google-site-verification',
                content: 'QlRmuLQWttdkbKlZ0ZwIBX3xv0M8ouqTW3wE2Eg_jKI',
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: `og:image`,
                        content: metaImage,
                      },
                      {
                        property: `og:image:alt`,
                        content: title,
                      },
                      {
                        property: 'og:image:width',
                        content: image.width,
                      },
                      {
                        property: 'og:image:height',
                        content: image.height,
                      },
                      {
                        name: `twitter:card`,
                        content: `summary_large_image`,
                      },
                    ]
                  : [
                      {
                        name: `twitter:card`,
                        content: `summary`,
                      },
                    ]
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  pathname: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  image: PropTypes.object,
  meta: PropTypes.array,
  pathname: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
        social {
          twitter {
            url 
          }
        }
      }
    }
  }
`
