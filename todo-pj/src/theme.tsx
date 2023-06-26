import tw, { theme as tailwindTheme } from 'twin.macro';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: tailwindTheme`colors.primary`,
    },
    secondary: {
      main: tailwindTheme`colors.secondary`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          ...tw`bg-primary text-lg font-bold`,
           color: tailwindTheme`colors.black`,
        },
        outlinedSecondary: {
          backgroundColor: tailwindTheme`colors.secondary`,
          color: tailwindTheme`colors.white`,
        },
        sizeLarge: {
          height: "3.5rem",
          ...tw`px-8 text-base`,
        },
      },
    },
  },
});export default theme;