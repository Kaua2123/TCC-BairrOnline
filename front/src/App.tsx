import { extendTheme, ChakraProvider } from "@chakra-ui/react";

function App() {

  const theme = extendTheme({
    config: {
      initialColorMode: 'light', // Defina o modo inicial como claro
      useSystemColorMode: false, // Não use o modo de cores do sistema
    },
    // Defina as cores para o modo claro e escuro aqui
    colors: {
      light: {
        primary: '#338BB0', // Personalize as cores de luz aqui
      },
      dark: {
        primary: '#ffffff', // Personalize as cores escuras aqui
      },
    },
  });
  
  return (
    <ChakraProvider theme={theme}>
      <h1>App BairrOnline</h1>
    
      </ChakraProvider>

  );
}

export default App;