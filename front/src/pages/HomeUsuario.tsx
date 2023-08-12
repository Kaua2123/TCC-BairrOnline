import '../App.css';

//reação (reactkkkkkkkkkomgggmgmgmggm)
import  { Link } from 'react-router-dom'
import { useState } from 'react';

//imgs
import sectionOla from "../img/sectionOlaDenunciante.png";
import sectionDen from "../img/sectionDen.png";
import sectionInst from "../img/sectionInst.png";
import denunciaNaoAssumida from "../img/denunciaNaoassumida.png";


//react-swiper pros slides de denuncia
import { Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules";

//estilos do swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//chakra
import {Button, Center, Box, 
ChakraProvider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, 
Image, extendTheme, Text, Wrap, WrapItem, VStack } from '@chakra-ui/react'

//componentes
import Footer from '../components/Footer';
import { HeaderUsu } from '../components/Header';
import Denuncie from '../components/Denuncie';
import { CardDenUsu } from '../components/CardDen';
import { SlideDenUsu } from '../components/SlideDen';


const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        background: "",
      },
    }),
  },
});


const HomeUsuario = () => { 


 return (
  <ChakraProvider theme={theme}>
    <HeaderUsu/>
    <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
    <Flex align='center'>
      <Box bgColor='white' borderRadius='4px' h='auto' w='100%'>
        
        <Text p='100px' fontSize='64px' color='#338bb0' fontFamily='BreeSerif-Regular'>Olá, Denunciante!</Text>

        <Flex justifyContent='space-between'>
          <Flex direction='column' mt='-200px' id='denuncie'>
            <Image src={sectionOla} boxSize='50em' ></Image>
          </Flex>


          <Flex direction='column' p='180px' mt='-150px'>
            <Box>
            <Text fontSize='44px' color='#338BB0'   fontFamily='BreeSerif-Regular' whiteSpace='nowrap' align='center'>Seção do Usuário</Text>
            </Box>  
            <Box mt='70px'>
            <Text fontSize='25px' whiteSpace='nowrap'>Denuncie, veja suas <b color='green'> denúncias</b> <br /> e o retorno das instituições</Text>
            </Box>
          </Flex>
        </Flex>

        <Box id='denuncieAqui'>
          <Denuncie/>
        </Box>

        <Flex justify='center'> 
          <Box>
            <Text fontSize='44px' color='#338BB0'  fontFamily='BreeSerif-Regular' whiteSpace='nowrap' >Suas denúncias</Text>
          </Box>
        </Flex>

            <Center>
                <Box maxH='900px' w='1400px' mt='20px'  boxShadow='lg'>
        
                  

                     <SlideDenUsu/>
              {/* as denuncias da home n tem mais comentarios diretamente nelas agora, tem um botao
              ver denuncia q vai pra pagina de ver denuncias do gabriel, e lá vai ter a exibição da denuncia
              que foi clicada e de outras se o cara quiser filtrar. lá vai ter os comentarioszin */}

       
                         
                </Box>
                </Center>

        <Flex justify='center' id='sexo'>
          <Image src={sectionInst} boxSize='57em'></Image>
        </Flex>
        <Flex justify='center'>
          <Text mt='-100px' fontSize='54px' fontFamily='BreeSerif-Regular' color='#338BB0' whiteSpace='nowrap'>Denúncias assumidas</Text>
        </Flex>

        <Flex justify='center'>
          <Image src={denunciaNaoAssumida} boxSize='45em'></Image>
        </Flex>

        <Flex justify='center'>
        <Text mt='-100px' fontSize='30px'  whiteSpace='nowrap'>Parece que nenhuma instituição assumiu alguma denúncia sua.</Text> 
        </Flex>
  
      </Box>
      
    </Flex>




     <Footer/>
     </ChakraProvider>

  );
};

export default HomeUsuario;