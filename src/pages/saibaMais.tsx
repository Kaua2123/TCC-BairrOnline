
//chakra
import { Box, ChakraProvider, Flex, extendTheme, Image, Text } from "@chakra-ui/react";

//imgs
import ilustDen from '../img/ilustracaoDenuncia.png';
import tarefas from '../img/tarefas.png';

//componentees
import Header from "../components/Header";
import Footer from "../components/Footer";



const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          background: "",
        },
      }),
    },
  });

const saibaMais = () => {
    return(
        
        <ChakraProvider theme={theme}>
    <Header/>

        <Flex justify='center'>
            <Box w='100%' h='110em' mt='50px' borderRadius='4px'   bg='white'>
                <Flex justifyContent='space-between'>
                    <Flex direction='column'>
                        <Image src={ilustDen} w='650px' h='500px' m='60px'></Image>
                     {/*o foda é q a imagem n é svg, ent ta perdendo a qualidade. arrumar uma forma de 
                     converter, sla*/}
                    </Flex> 
                    <Flex flexDirection='column'>
                        <Box m='200px'>
                            <Text color='#338BB0'  textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='70px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >BairrOnline </Text>
                            <Text color='#338BB0'  textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='40px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' whiteSpace='nowrap' >Seu portal de denúncias</Text>
                        </Box>
                    </Flex>
                </Flex>

                <Flex justifyContent='space-between' mt='120px  '> 
                     <Flex direction='column'> 
                        <Box>
                             <Text color='#338BB0' m='18px'  textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='40px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' whiteSpace='nowrap' >
                                O que é o BairrOnline?
                             </Text>
                             <Text  m='18px'  fontSize='2.5vh' fontFamily='Inter-Regular'  whiteSpace='nowrap' >
                                BairrOnline é uma aplicação com o foco de facilitar a realização das 
                                <br />denúncias referentes  a estrutura de bairros de Volta Redonda, e 
                                relatar<br /> os mesmos para as instituições relacionadas,  dando visibilidade 
                                <br /> e por conseguinte uma maior chance de resolução dos problemas <br /> relatados.  
                                Em outras palavras, um portal de denúncias
                             </Text>


                             <Text color='#338BB0' m='18px'  textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='40px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' whiteSpace='nowrap' >
                                Que funções o BairrOnline oferece?
                             </Text>
                             <Text  m='18px'  fontSize='2.5vh' fontFamily='Inter-Regular'  whiteSpace='nowrap' >O usuário, como denunciante, poderá efetuar as denúncias e visualizar as 
                                <br /> denúncias de outros usuários. Estas, serão encaminhadas para as instituições, que 
                                <br /> decidirão se irão assumir a denúncia para resolver, ou não. Caso assumam 
                                <br /> alguma denúncia, esta será exibida para o usuário, que poderá acompanhar a resolução.
                             </Text>

                             <Text color='#338BB0' m='18px'  textShadow='0px 2.6px 2px rgb(172, 172, 172);' fontSize='40px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' whiteSpace='nowrap' >
                                Por que escolher o BairrOnline?
                             </Text>
                             <Text  m='18px'  fontSize='2.5vh' fontFamily='Inter-Regular'  whiteSpace='nowrap' >
                                Nossa proposta com o BairrOnline, é fazer com que as denúncias tenham <br /> visibilidade
                                e sejam realmente notadas pelas instituições. Faremos o nosso   <br />  melhor para que de fato, 
                                seja uma aplicação eficiente e que satisfaça <br />  às expectativas dos usuários da mesma.

                             </Text>    


                        </Box>

                     </Flex>

                     <Flex direction='column'>
                        <Image src={tarefas} w='880px' h='674px' ></Image>
                    </Flex>
                </Flex>
            </Box>
        </Flex>

    
    <Footer/>
    </ChakraProvider>
 )
}

export default saibaMais;