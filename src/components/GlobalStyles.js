import React from 'react'
import emotionReset from 'emotion-reset';
import {Global, css} from '@emotion/core';

function GlobalStyles() {
  return (
    <Global styles={css`
      ${emotionReset}

      html {
        height: 100%;
        overflow-x: hidden;
      }

      body { 
        font-family: 'Beth Ellen', cursive;
        line-height: 150%;
        height: 100%;
        overflow-x: hidden;
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
