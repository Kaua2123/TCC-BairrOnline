import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

function App() {

 
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <h1>app bairrolnine</h1>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;