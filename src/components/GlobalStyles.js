import React from 'react'
import emotionReset from 'emotion-reset';
import {Global, css} from '@emotion/core';
import backgroundTexture from '../images/background-texture.jpg'

function GlobalStyles() {
  return (
    <Global styles={css`
      ${emotionReset}

      body { 
        background-image: url(${backgroundTexture});
        font-family: 'Barlow', sans-serif;
        line-height: 150%;
      }

      p { 
        margin-top: 20px;
      }
      
      p:first-of-type {
        margin-top: 0;
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
