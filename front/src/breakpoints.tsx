import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    base: '0px',
    sm: '480px', // pequenas telas, smartphones
    md: '768px', // telas médias, tablets
    lg: '992px', // telas grandes, laptops
    xl: '1200px', // telas mt grandes, desktops
  },

});

export default theme;
