/** @jsx jsx */
import { jsx } from 'theme-ui'
import LogoMark from '../images/logo/the-hooligans-logomark.png'
import BgSmear from '../images/SVGs/BgSmear'
import X1 from '../images/SVGs/X1'
import { randomize } from '../utils/helpers'

function Hero() {
  return (
    <div sx={{ px: [6,8,10], position: 'relative' }}>
      <div sx={{
        // bg: 'secondary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        mx: 'auto',
        position: 'relative',
        width: "100%",
        }}
      >
        <BgSmear sx={{
          color: 'secondary',
          height: '110%',
          left: '-5%',
          opacity: '0.9',
          position: 'absolute',
          top: '-2%',
          transform: `rotate(${randomize(-1,1)}deg)`,
          width: '110%',
          zIndex: -1,
          }}
        />
        <img 
          src={LogoMark}
          alt="The Hooligans"
          sx={{
            display: 'block',
            mx: 'auto',
            maxWidth: '500px',
            transform: `rotate(${randomize(-2,2)}deg)`,
            width: "60vw",
            zIndex: 1
          }}/>
      </div>
      <X1
        fill="currentColor"
        sx={{
          color: 'black',
          height: ['100px', '100px', '100px', '200px'],
          left: '-10px',
          position: 'absolute',
          bottom: '15vmin',
          transform: `rotate(${randomize(-10,10)}deg)`,
          width: ['100px', '100px', '100px', '200px'],
          zIndex: 2,
        }}
      />
      <X1
        fill="currentColor"
        sx={{
          color: 'black',
          height: ['60px', '60px', '60px', '120px'],
          left: '-30px',
          position: 'absolute',
          bottom: '2vmin',
          transform: `rotate(${randomize(185,200)}deg)`,
          width: ['60px', '60px', '60px', '120px'],
          zIndex: 2,
        }}
      />
      <X1
        fill="currentColor"
        sx={{
          color: 'black',
          height: ['80px', '80px', '80px', '160px'],
          right: '20px',
          position: 'absolute',
          top: '16vmin',
          transform: `rotate(${randomize(60,80)}deg)`,
          width: ['80px', '80px', '80px', '160px'],
          zIndex: 2,
        }}
      />
    </div>
  )
}

export default Hero
