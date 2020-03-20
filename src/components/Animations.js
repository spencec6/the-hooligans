import { keyframes } from '@emotion/core'

export const BlinkGlitch = keyframes`
  0%, 10%, 35%, 50%, 70%, 75%, 90% {
    opacity: 0;
  }
  1%, 8%, 12%, 32%, 37%, 47%, 52%, 68%, 71%, 74%, 78%, 88%, 93%, 100% {
    opacity: 1;
  }
`
export const FadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20%)
  }
  100% {
    opacity: 1;
    transform: translateY(0)
  }
`