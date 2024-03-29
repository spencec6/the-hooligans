let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken:
    process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
  downloadLocal: true
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

const website = require('./config/website')

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = website.url + website.pathPrefix,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

const pathPrefix = website.pathPrefix === `/` ? `` : website.pathPrefix

module.exports = {
  siteMetadata: {
    pathPrefix: pathPrefix,
    siteUrl: siteUrl + pathPrefix,
    siteLanguage: website.siteLanguage,
    title: website.title,
    description: website.description,
    email: website.email,
    address: website.address,
    social: {
      ...website.socialMedia
    }
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteUrl + pathPrefix,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: website.googleAnalyticsId,
    //     anonymize: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: website.title,
        short_name: website.shortName,
        description: website.description,
        start_url: `/`,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: `standalone`,
        icon: website.favicon,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Barlow`,
            variants: [`300`, `500`, `700`, `900`],
          },
          {
            family: `Beth Ellen`,
            variants: [`400`],
          }
        ],
      },
    },
    { 
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }]
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              linkImagesToOriginal: false,
              showCaptions: true,
              sizeByPixelDensity: true,
              wrapperStyle: '',
            },
          },
        ],
      },
    },
  ],
}
