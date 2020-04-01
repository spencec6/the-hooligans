const colors = {
  transparent: 'transparent',
  greys: {
    100: '#ffffff',
    200: '#f8fafc',
    300: '#E9E9E9',
    400: '#D3D4D4',
    500: '#A8A8A9',
    600: '#7C7D7D',
    700: '#515252',
    800: '#4E4F50',
    900: '#252627',
  },
  reds: {
    100: '#fcebea',
    200: '#f9acaa',
    300: '#ef5753',
    400: '#ED4622',
    500: '#cc1f1a',
    600: '#621b18',
    700: '#3b0d0c',
  },
  oranges: {
    100: '#fff5eb',
    200: '#fcd9b6',
    300: '#faad63',
    400: '#f6993f',
    500: '#de751f',
    600: '#613b1f',
    700: '#462a16',
  },
  yellows: {
    100: '#fcfbeb',
    200: '#fff9c2',
    300: '#fff382',
    400: '#F9EC34',
    500: '#f2d024',
    600: '#684f1d',
    700: '#453411',
  },
  greens: {
    100: '#e3fcec',
    200: '#a2f5bf',
    300: '#51d88a',
    400: '#D4FF59',
    500: '#1f9d55',
    600: '#1a4731',
    700: '#0f2f21',
  },
  teals: {
    100: '#e8fffe',
    200: '#a0f0ed',
    300: '#64FFDA',
    400: '#4dc0b5',
    500: '#38a89d',
    600: '#20504f',
    700: '#0d3331',
  },
  blues: {
    100: '#e0eafa',
    200: '#b5ccf2',
    300: '#7ba5e8',
    400: '#1D3FCF',
    500: '#1430a7',
    600: '#1c3d5a',
    700: '#12283a',
  },
  indigos: {
    100: '#e6e8ff',
    200: '#b2b7ff',
    300: '#7886d7',
    400: '#051497',
    500: '#5661b3',
    600: '#2f365f',
    700: '#121E52',
  },
  purples: {
    100: '#f3ebff',
    200: '#d6bbfc',
    300: '#a779e9',
    400: '#9561e2',
    500: '#794acf',
    600: '#382b5f',
    700: '#21183c',
  },
  pinks: {
    100: '#ffebef',
    200: '#ffbbca',
    300: '#fa7ea8',
    400: '#ef336c',
    500: '#d8275d',
    600: '#6f213f',
    700: '#451225',
  },
}

colors.white = colors.greys[100]
colors.black = colors.greys[900]
colors.grey = colors.greys[500]
colors.magenta = colors.pinks[400]
colors.yellow = colors.yellows[400]
colors.lime = colors.greens[400]
colors.teal = colors.teals[300]

export default {
  useColorSchemeMediaQuery: true,
  colors: {
    greys: {
      ...colors.greys
    },
    primary: colors.magenta,
    primary_dk: colors.pinks[500],
    secondary: colors.yellow,
    secondary_dk: colors.lime,
    black: colors.black,
    magenta: colors.magenta,
    yellow: colors.yellow,
    lime: colors.lime,
    teal: colors.teal,
    error: colors.pinks[500],
    border: colors.greys[300],
    icon: colors.black,
  },
  space: [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120],
  fonts: {
    sans:
      "'Barlow', sans-serif",
    cursive:
      "'Beth Ellen', cursive",
    serif:
      '"Georgia", serif',
    monospace:
      'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 30, 36, 48, 64, 72, 96],
  fontWeights: {
    book: 400,
    bold: 700,
    black: 900
  },
  leading: {
    none: "100%",
    tight: "125%",
    normal: "175%",
    loose: "200%",
  },
  tracking: {
    tight: '0.5px',
    loose: '1px',
    looser: '2px'
  },
  radii: [0, 2, 4, 8, 16, 50, 100, 300],
  shadows: {
    none: 'none',
    default: '0 2px 4px 0 rgba(0,0,0,0.10)',
    md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
    lg: '0 10px 40px 0 rgba(0,0,0,0.06), 0 5px 15px 0 rgba(0,0,0,0.04)',
    xl: '0 20px 40px 0 rgba(0,0,0,0.06), 0 25px 50px 0 rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    outline: `0 0 0 1px ${colors.teal}`,
    error: `0 0 0 3px ${colors.magenta}`,
    link: `inset 0 -2px ${colors.magenta}`,
    linkHover: `inset 0 -2px ${colors.yellow}`,
  },
  breakpoints: ['576px', '768px', '992px', '1200px'],
  maxWidths: {
    none: 'none',
    md: '540px',
    lg: '720px',
    xl: '1080px',
    xxl: '1400px'
  },
  boxes: {
    card: {
      backgroundColor: 'greys.200',
      borderRadius: 0,
      boxShadow: theme => theme.shadows.lg,
      boxSizing: 'border-box',
      p: 5,
    },
    cell: {
      maxWidth: theme => theme.maxWidths.xl,
      mx: 'auto',
      position: 'relative',
      width: "100%",
    }
  },
  buttons: {
    primary: {
      color: 'white',
      '& .button-bgSmear': {
        color: 'black'
      },
      '&:hover': {
        color: 'white',
      },
      '&:hover .button-bgSmear': {
        color: 'primary',
      },
    },
    secondary: {
      color: 'primary',
      '& .button-bgSmear': {
        color: 'secondary'
      },
      '&:hover': {
        color: 'primary',
      },
      '&:hover .button-bgSmear': {
        color: 'lime',
      },
    },
    tertiary: {
      color: 'primary',
      '& .button-bgSmear': {
        color: 'teal'
      },
      '&:hover': {
        color: 'primary',
      },
      '&:hover .button-bgSmear': {
        color: 'secondary',
      },
    },
  },
  forms: {
    label: {
      fontFamily: 'sans',
      fontSize: 1,
      fontWeight: 'bold',
      lineHeight: "100%",
      mb: 1,
      variant: 'text.allcaps'
    },
    field: {
      appearance: 'none',
      backgroundColor: 'greys.100',
      borderColor: 'secondary',
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 0,
      color: 'black',
      fontFamily: 'sans',
      fontSize: [1,2],
      p: 3,
      width: '100%',
      '& ~ .input-bgSmear': {
        color: 'secondary'
      },
      '&:focus': {
        borderColor: 'teal',
        boxShadow: theme => theme.shadows.outline,
        outline: 'none'
      },
      '&:focus ~ .input-bgSmear': {
        color: 'teal'
      },
      '&::placeholder': {
        color: 'greys.500'
      }
    },
    input: {
      variant: 'forms.field',
    },
    select: {
      variant: 'forms.field',
    },
    slider: {
      backgroundColor: 'border',
    },
  },
  text: {
    heading: {
      color: 'black',
      fontFamily: 'sans',
      fontWeight: '700',
      lineHeight: theme => `${theme.leading.none}`,
      mb: [2,3],
      mt: 0,
      textTransform: 'uppercase'
    },
    allcaps: {
      letterSpacing: theme => `${theme.tracking.loose}`,
      textTransform: 'uppercase',
    }
  },
  styles: {
    h1: { variant: 'text.heading', fontSize: [8,9,10] },
    h2: { variant: 'text.heading', fontSize: [7,8,9] },
    h3: { variant: 'text.heading', fontSize: [6,7,8] },
    h4: { variant: 'text.heading', fontSize: [5,6,7] },
    h5: { variant: 'text.heading', fontSize: [4,5,6] },
    h6: { variant: 'text.heading', fontSize: [3,4,5] },
    p: {
      fontFamily: 'inherit',
      fontSize: [2,3],
      lineHeight: theme => theme.leading.normal,
      '&:first-of-type': {
        mt: 0,
      }
    },
    links: {
      link: {
        boxShadow: theme => theme.shadows.link,
        color: 'primary',
        cursor: 'pointer',
        fontFamily: 'sans',
        fontWeight: 'bold',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      },
      nav: {
        color: 'primary',
        cursor: 'pointer',
        fontFamily: 'sans',
        fontSize: 4,
        fontWeight: 'bold',
        mb: 0,
        textDeocration: 'none',
        transition: 'transform 0.25s ease-in-out',
        variant: 'text.allcaps',
        '&.is-active ~ .linkSmear': {
          opacity: 1,
          transform: 'rotate(0deg)',
        },
        '&:hover': {
          fontSize: 4,
          color: 'black',
          fontFamily: 'cursive',
          transform: 'translateY(-1px)',
          textTransform: 'lowercase',
        },
        '&:hover ~ .linkSmear': {
          opacity: 1,
          transform: 'rotate(0deg)',
        }
      },
    }
  }
}
