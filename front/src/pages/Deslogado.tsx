//chakra
import { ChakraProvider, Flex, Image, Text, IconButton, Button, Box, Stack, Center, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"

import {Link} from "react-router-dom"

//imgs
import deslogado from "../img/Deslogado.png";
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";
import { IoChevronBackCircleOutline  } from "react-icons/io5";



const Deslogado = () => {
    return(
        <ChakraProvider>
         <Button m='20px' mt='20px' color='black' leftIcon={<IoChevronBackCircleOutline size='3vh' />} cursor='pointer'  _hover={{color: '#338bb0', transition: '0.1s'}}>
            <Link to='/'> Voltar </Link>
         </Button>

          
            <Flex justifyContent='space-between'>
                <Flex direction='column'> 
                    <Text m='80px' fontSize='70px' whiteSpace='pre-wrap' color='#338bb0' fontFamily='BreeSerif-Regular'>Você está <br />deslogado</Text>
                    <Text ml='35px'>Você está deslogado. Para realizar denúncias, por favor, <br /> entre na sua conta. Ainda não tem uma? Cadastre-se</Text>
                    <Box m='100px'>
                        <Stack  spacing={5} direction='row' >
                            <Button bgColor='#338BB0' color='white' _hover={{color: '#338BB0', bgColor: 'white'}}> <Link to='/Login'> Entre </Link></Button>
                            <Button variant='outline'  color='#338bb0' > <Link to='/Cadastro'> Cadastre-se </Link></Button>
                        </Stack>
                     
                    <Box mt='80px' ml='40px'>
                        <Stack spacing={4} direction='row'>
                            <IconButton aria-label="kk" variant='unstyled' color='black' icon={<FaFacebookF size='3vh' />} cursor='pointer'  _hover={{color: '#338bb0', transition: '0.1s'}}></IconButton>
                            <IconButton aria-label="kk" variant='unstyled' color='black' icon={<FaInstagram size='3vh' />} cursor='pointer'  _hover={{color: '#338bb0', transition: '0.1s'}}></IconButton>
                            <IconButton aria-label="kk" variant='unstyled' color='black' icon={<FaTwitter size='3vh' />}   cursor='pointer'  _hover={{color: '#338bb0', transition: '0.1s'}}></IconButton>
                        </Stack>
                    </Box>
                    </Box>
                </Flex>

                <Flex direction='column'> 
                    <Box mt='50px' border='20px solid #338bb0' borderBottom='none' borderRight='none' borderRadius='3%'>
                        <Image src={deslogado}></Image>
                    </Box>
                </Flex>
            </Flex>
            
        <Box m='100px' mt='20px'>
            
        </Box>

        </ChakraProvider>
    )
}

export default Deslogado;   