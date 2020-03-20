/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

/**
 * Enable absolute imports with `/src` as root.
 *
 * See: https://github.com/alampros/gatsby-plugin-resolve-src/issues/4
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // '@style': path.resolve(__dirname, './src/util/style'),
        '@components': path.resolve(__dirname, './src/components'),
        // '@test': path.resolve(__dirname, './src/util/test'),
      },
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const portfolioEntry = path.resolve('src/templates/portfolio-project.js')

    resolve(
      graphql(
        `
          {
            allContentfulPortfolio {
              edges {
                node {
                  slug
                  title
                  post {
                    json
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        console.log(result)
        const entries = result.data.allContentfulPortfolio.edges
        entries.forEach((entry, index) => {
          const nextPage =
            entry.node.displayOrder === entries.length
              ? 1
              : entry.node.displayOrder + 1
          const previousPage =
            entry.node.displayOrder === 1
              ? entries.length
              : entry.node.displayOrder - 1

          createPage({
            path: `/portfolio/${entry.node.slug}/`,
            component: portfolioEntry,
            context: {
              slug: entry.node.slug,
              nextPage: nextPage,
              previousPage: previousPage,
            },
          })
        })
      })
    )
  })
}
