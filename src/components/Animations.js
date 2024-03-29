import { keyframes } from '@emotion/core'

export const Blink = keyframes`
  0%, 3%, 7%, 12%, 38%, 100% {
    opacity: 0;
  }
  5%, 10%, 15%, 35% {
    opacity: 1;
  }
`

export const FadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

export const GlitchIn = keyframes`
  0%, 3%, 7%, 10%, 15%, 25%, 50%, 80% {
    opacity: 0;
    transform: scale(1);
  }
  2%, 5%, 12%, 37%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  8%, 62% {
    opacity: 1;
    transform: scaleX(1.4);
  }
  20% {
    opacity: 1;
    transform: scaleY(1.5);
  }
`

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