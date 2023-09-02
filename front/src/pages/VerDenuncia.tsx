
import '../App.css';

//componentes
import Ver from '../components/Ver'
import Header, { HeaderInst, HeaderUsu } from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';

//igms



const bairros = ['Todos', 'Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte', 'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal', 'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia', 'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera', 'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês', 'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta', 'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];
const problemas = ['Buraco', 'Lixo', 'Luz'];

const VerDenuncia = () => {




  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });

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

    return (
      
      <ChakraProvider theme={theme}>
         {headerComponent}
      <Ver/>
      <Footer/>
       
        </ChakraProvider>
    );
};  

export default VerDenuncia;