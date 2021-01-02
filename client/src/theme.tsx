import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
});

const theme = extendTheme({
  colors: {
    black: '#16161D'
  },
  fonts,
  breakpoints,
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold'
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px'
        },
        sm: {
          w: '100px',
          mx: '5px'
        }
      },
      defaultProps: {
        colorScheme: 'teal'
      }
    }
  }
});

export default theme;
