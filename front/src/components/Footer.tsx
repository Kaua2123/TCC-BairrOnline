
import { VStack, HStack, Button, Flex, Spacer, Image, Text, Container, useColorMode} from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Logo from '../img/logo.svg';

const Footer = () => {

    const {colorMode} = useColorMode();

    return(

            <Flex w='100%' bg={colorMode === 'light' ? '#322F2F' : 'gray.700'} mt='14'>
    
                <Image src={Logo} boxSize='xs'></Image>
                <Spacer/>
                    <VStack mt='12'>
                        <Text fontSize='xl' fontFamily='BreeSerif-Regular' color={colorMode === 'light' ? '#717171' : '#1E90FF'}>Usuário</Text>
                            <Link to='/'>           <Button variant='link' fontFamily='BreeSerif-Regular' fontWeight='normal' _hover={colorMode === 'light' ? {color: '#338BB0'} : {color: '#1E90FF'}} color='white'>Início</Button> </Link>
                            <Link to='/Cadastro'>   <Button variant='link' fontFamily='BreeSerif-Regular' fontWeight='normal' _hover={colorMode === 'light' ? {color: '#338BB0'} : {color: '#1E90FF'}} color='white'>Cadastre-se</Button> </Link>
                            <Link to='/Login'>      <Button variant='link' fontFamily='BreeSerif-Regular' fontWeight='normal' _hover={colorMode === 'light' ? {color: '#338BB0'} : {color: '#1E90FF'}} color='white'>Entrar</Button> </Link>
                    </VStack>
                <Spacer/>
                    <VStack mt='12'>
                        <Text fontSize='xl' fontFamily='BreeSerif-Regular' color={colorMode === 'light' ? '#717171' : '#1E90FF'}>Saiba mais</Text>
                            <Button variant='link' fontFamily='BreeSerif-Regular' fontWeight='normal' _hover={colorMode === 'light' ? {color: '#338bb0'} : {color: '#1E90FF'}} color='white'>Sobre nós</Button>
                            <Button variant='link' fontFamily='BreeSerif-Regular' fontWeight='normal' _hover={colorMode === 'light' ? {color: '#338bb0'} : {color: '#1E90FF'}} color='white'>Perguntas frequentes</Button>
                            <Button variant='link' fontFamily='BreeSerif-Regular' fontWeight='normal' _hover={colorMode === 'light' ? {color: '#338bb0'} : {color: '#1E90FF'}} color='white'>Contato</Button>
                    </VStack>
                <Spacer/>
                <Spacer/>
          
                        <HStack>
                            <Container p='15px' borderRadius='50%' bg='blackAlpha.400' _hover={{background: 'blackAlpha.100'}} >
                                <Link to='/'> <FaWhatsapp size='5vh' color='white' _hover={{color: 'blue'}}/> </Link> 
                            </Container>

                            <Container p='15px' borderRadius='50%' bg='blackAlpha.400' _hover={{background: 'blackAlpha.100'}} >
                                <Link to='/'> <FaFacebook size='5vh' color='white' /> </Link> 
                            </Container>
                            
                            <Container p='15px' borderRadius='50%' bg='blackAlpha.400' _hover={{background: 'blackAlpha.100'}} >
                                <Link to='/'> <FaInstagram size='5vh' color='white'/> </Link> 
                            </Container>
                        </HStack>
            
                <Spacer/>
            </Flex>
    )



}


export default Footer;
