import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Comentarios from './Comentarios';
import { useState } from 'react';
import { Reportar } from './reportar';
import AssumirTarefa from './AssumirTarefa';
import { MenuOutlined } from '@ant-design/icons';
import { Flex, Center, Menu, MenuButton, IconButton, MenuList, MenuItem, Spacer, HStack, Button, Image, ChakraProvider} from '@chakra-ui/react';
import Footer from '../components/Footer';
import { HeaderInst } from '../components/Header';

//ALTERAR A HOME TLGD O DESIGN TLGD PQ ELA TA COMO USUARIO MAS É PRA SER DESLOGADA OU SEJA MUDAR AS OPSOES
const Home = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);
  const [OpenTaf , setOpenTaf] = useState(false);

 return (
    <ChakraProvider>

      <HeaderInst/>


        
      <Footer/>
    </ChakraProvider>

  );
}

export default Home;