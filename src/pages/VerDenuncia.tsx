import { Link } from 'react-router-dom';
import '../App.css';
import Instagram from '../img/instagram.svg';
import twitter from '../img/twitter.png'
import Logo from '../img/logo.svg';
import { useState } from 'react';
import AssumirTarefa from './AssumirTarefa';

const bairros = ['Todos', 'Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte', 'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal', 'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia', 'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera', 'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês', 'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta', 'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];
const problemas = ['Buraco', 'Lixo', 'Luz'];

//componentes
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const VerDenuncia = () => {

  const [openCom, setOpenCom] = useState(false);

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });


    return (
      <ChakraProvider theme={theme}>
          <Header/>

 <body>
      <div className='acompanhar'>
    <h1 className='h1acompanhar'> Veja aqui as denúncias já enviadas </h1>
      </div>
      <div className='filtrar'>
      <label className='labelBairro' htmlFor="Filtro"> Bairros </label>
  <label className='labelFiltro' htmlFor="Filtro"> Problemas </label>
  
  <button className='btnFiltrar'>Aplicar</button>
  

    </div>
    <div className='organizarpor'>
    <h2 className='organizar'>Organizar por:</h2>
    <select className='slct1'>
      <option>Mais populares</option>
      <option>Mais recentes</option>
    </select>
    </div>
      <div className='denuncias'>
      
      </div>
 </body>

      <Footer/>
       
        </ChakraProvider>
    );
};  

export default VerDenuncia;