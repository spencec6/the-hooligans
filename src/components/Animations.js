import { keyframes } from '@emotion/core'

export const GlitchRotate = keyframes`
  0%, 10%, 35%, 50%, 70%, 75%, 90% {
    transform: rotate(0deg);
  }
  1%, 32%, 37%, 68%, 71%, 88%, 93% {
    transform: rotate(2deg);
  }
  8%, 12%, 47%, 52%, 74%, 78%, 100% {
    transform: rotate(-2deg);
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