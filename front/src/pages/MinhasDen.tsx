import { ChakraProvider } from "@chakra-ui/react";
import Header, { HeaderUsu, HeaderInst } from "../components/Header";
import jwt_decode from "jwt-decode";
import Footer from "../components/Footer";


const MinhasDen = () => {
    
    const token = localStorage.getItem('token');
  const decodificaToken = token ? jwt_decode(token) : null;
  
  let headerComponent = null;
  
  if (decodificaToken && decodificaToken.usu_tipo === 'denunciante') {
    headerComponent = <HeaderUsu />;
  } else if (decodificaToken && decodificaToken.usu_tipo === 'instituicao') {
    headerComponent = <HeaderInst />;
  } else {
    headerComponent = <Header/>;
  }
    return(
        <ChakraProvider>
            {headerComponent}

            <Footer/>
        </ChakraProvider>
    )
}

export default MinhasDen;