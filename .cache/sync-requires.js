const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/Users/spencec6/Sites/projects/the-hooligans/src/pages/404.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("/Users/spencec6/Sites/projects/the-hooligans/src/pages/about.js"))),
  "component---src-pages-contact-js": hot(preferDefault(require("/Users/spencec6/Sites/projects/the-hooligans/src/pages/contact.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/spencec6/Sites/projects/the-hooligans/src/pages/index.js"))),
  "component---src-pages-services-js": hot(preferDefault(require("/Users/spencec6/Sites/projects/the-hooligans/src/pages/services.js")))
}

