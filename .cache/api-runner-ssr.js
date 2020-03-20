var plugins = [{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-theme-ui/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-canonical-urls/gatsby-ssr'),
      options: {"plugins":[],"siteUrl":"https://www.the-hooligans.com"},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-facebook-pixel/gatsby-ssr'),
      options: {"plugins":[],"pixelId":"undefined"},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-XXXXX","anonymize":true},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"The Hooligans","short_name":"Hooligans","description":"Mindful and creative agency","start_url":"/","background_color":"#ffffff","theme_color":"#ffffff","display":"standalone","icon":"static/favicon.png"},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-prefetch-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":[{"family":"Eczar","variants":["500","700"]},{"family":"Barlow","variants":["300","500","700","900"]}]},
    },{
      plugin: require('/Users/spencec6/Sites/projects/the-hooligans/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","exclude":["/category/*","/tag/*"],"query":"\n        {\n          site {\n            siteMetadata {\n              siteUrl\n            }\n          }\n\n          allSitePage {\n            edges {\n              node {\n                path\n              }\n            }\n          }\n        }"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
