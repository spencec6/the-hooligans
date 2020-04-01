import React from 'react'
import emotionReset from 'emotion-reset';
import {Global, css} from '@emotion/core';
// import backgroundTexture from '../images/background-texture.jpg'
import { useStaticQuery, graphql } from 'gatsby';

function GlobalStyles() {
  const data = useStaticQuery(graphql`
    query {
      mobileBg: file(relativePath: { eq: "background-texture.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 768, quality: 60) {
              src
            }
          }
        }
      desktopBg: file(relativePath: { eq: "background-texture.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1024, quality: 60) {
            src
          }
        }
      }
    }
  `)
  const { mobileBg, desktopBg } = data
  return (
    <Global styles={css`
      ${emotionReset}

      html {
        height: 100%;
        overflow-x: hidden;
      }

      body { 
        background-image: url(${mobileBg.childImageSharp.fluid.src});
        font-family: 'Beth Ellen', cursive;
        line-height: 150%;
        height: 100%;
        overflow-x: hidden;
        @media only screen and (min-width: 768px) {
          background-image: url(${desktopBg.childImageSharp.fluid.src});
        }
      }

      p { 
        margin-top: 20px;
      }
      
      p:first-of-type {
        margin-top: 0;
      }

      i { 
        font-style: italic;
      }

      b { 
        font-weight: bold;
      }
  
      *, *::after, *::before {
        box-sizing: border-box;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }
    `}
  />
  )
}

export default GlobalStyles
