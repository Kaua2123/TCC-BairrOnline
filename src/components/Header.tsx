
//chakra
import { Menu,Image,Text, MenuButton, Button, IconButton, MenuList, MenuItem,
  Center, Flex, HStack, Spacer,Popover,PopoverTrigger,
  PopoverContent,PopoverHeader,PopoverBody, 
  PopoverArrow, PopoverCloseButton, Divider,VStack} from "@chakra-ui/react";
import { Avatar, Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";


//react
import {Link} from 'react-router-dom';
import notimg from './../img/buraco.jpg'

//icones
import { AiOutlineUser } from 'react-icons/ai'
import { CgLogIn } from 'react-icons/cg'
import { FaUserAlt } from "react-icons/fa";
import Logo from '../img/logo.svg';
import { MenuOutlined } from "@ant-design/icons";
import { AiOutlineBell } from "react-icons/ai";

//componentes
 import { NotfiInst } from "./infoDen";

const Header = () => {
  return(
      <Flex w='100%'  bg='#322F2F' boxShadow='dark-lg' position={"sticky"} top={0} zIndex={2}> 

          <Center>  
          <Menu>
            <MenuButton bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
            <MenuItem >BairrOnline</MenuItem>
            <MenuItem  as='a' href="#">Sobre nós</MenuItem>
            <MenuItem as='a' href="#">Contate-nos</MenuItem>
            </MenuList>
          </Menu>
          </Center>

          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>

          <Spacer/>
          
            <HStack w='25%' spacing='20' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                  <Link to='/Denuncie'> Denuncie aqui</Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                 <Link to='/VerDenuncia'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                 <Link to='/SaibaMais'> Saiba mais</Link>
              </Button> 
            </HStack>
            <Spacer/>

            <HStack spacing='4'>
              <Button colorScheme='blackAlpha' leftIcon={<AiOutlineUser/>} _hover={{backgroundColor: 'white', color: '#338bb0'}}> <Link to='/Cadastro'> Cadastre-se </Link> </Button>
              <Button colorScheme='blackAlpha' leftIcon={<CgLogIn/>} _hover={{backgroundColor: 'white', color: '#338bb0'}} mr='4' >  <Link to='/Login'> Login </Link></Button>
            </HStack>
          

      </Flex>
  )
}
         

 /*o Header do usuario só pode aparecer depois de um teste 
          de validação depois de logar, aí ele tem que ficar pra sempre
          até o usuario querer deslogar*/

export const HeaderUsu = () => {


  return(
    <ChakraProvider>
      <Flex w='100%'  bg='#322F2F' boxShadow='dark-lg' > 


{/*COMEÇA HEADERUSU NAV*/}
          <Center>  
          <Menu>
            <MenuButton bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
            <MenuItem >BairrOnline</MenuItem>
            <MenuItem  as='a' href="#">Sobre nós</MenuItem>
            <MenuItem as='a' href="#">Contate-nos</MenuItem>
            </MenuList>
          </Menu>
          </Center>

          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>



          <Spacer/>
          
            <HStack w='25%' spacing='20' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                  <Link to='/Denuncie'> Denuncie aqui</Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                 <Link to='/VerDenuncia'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                 <Link to='/SaibaMais'> Saiba mais</Link>
              </Button> 
            </HStack>

            <Spacer/>


{/*TERMINA HEADERUSU NAV*/}



  {/* COMEÇA NOTIFICAÇÃO */}


            <Box display={'inherit'} alignSelf={'center'} paddingRight={'2vh'}>
              <HStack spacing={'20px'}>
             
               
                <Popover>
                  <PopoverTrigger>
                  <Button variant={'ghost'} size={'3em'} padding='4px' colorScheme="whiteAlpha" borderRadius={'full'} >
                  <AiOutlineBell  fill='white' size='2.6em' />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent w={'max-content'} height={'400px'} overflowY={'auto'}>
                  <PopoverArrow/>
                  <PopoverCloseButton/>
                    <PopoverHeader textAlign={'center'} 
                     background={'blue.500'} //<-- FAZER CORES PERSONALIZADAS DEPOIS PQ O CHAKRA NAO ACEITA RGB >:(
                     color={'white'} 
                     fontFamily='BreeSerif-Regular'
                     fontSize={'15pt'}
                     letterSpacing={'1px'}>
                     
                    <p>Notificações</p>
                   </PopoverHeader>
                  <PopoverBody display={'flex'} h={'800px'} w={'400px'}maxW={'400px'} maxHeight={'maxcontent'} overflowY={'auto'} flexDirection={'column'}>
                   
                  <VStack spacing={'20px'}>
                  <NotfiInst/>
                  <NotfiInst/>
                  <NotfiInst/>
                  <NotfiInst/>
                  </VStack>
                  
                  
                  </PopoverBody>
                  </PopoverContent>
                </Popover>
               
              <Avatar icon={ <FaUserAlt/> }/>
            </HStack>
           </Box>


  {/* TERMINA NOTIFICAÇÃO */}
      </Flex>
      </ChakraProvider>
      
  )
}

export const HeaderInst = () => {
  return(
      <Flex w='100%'  bg='#322F2F' boxShadow='dark-lg' position={"sticky"} top={0} zIndex={2}> 

          <Center>  
          <Menu>
            <MenuButton bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
            <MenuItem >BairrOnline</MenuItem>
            <MenuItem  as='a' href="#">Sobre nós</MenuItem>
            <MenuItem as='a' href="#">Contate-nos</MenuItem>
            </MenuList>
          </Menu>
          </Center>

          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>

          <Spacer/>
          
            <HStack w='25%' spacing='20' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              mr='45px'>
                  <Link to='/Denuncie'>Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              mr='20px'>
                 <Link to='/VerDenuncia'>Denúncias avaliadas </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              ml='45px'>
                 <Link to='/SaibaMais'>Denúncias assumidas</Link>
              </Button> 
            </HStack>
            <Spacer/>

            <HStack spacing='4'>
              <Button colorScheme='blackAlpha' leftIcon={<AiOutlineUser/>} _hover={{backgroundColor: 'white', color: '#338bb0'}}> <Link to='/Cadastro'> Cadastre-se </Link> </Button>
              <Button colorScheme='blackAlpha' leftIcon={<CgLogIn/>} _hover={{backgroundColor: 'white', color: '#338bb0'}} mr='4' >  <Link to='/Login'> Login </Link></Button>
            </HStack>
          

      </Flex>
  )
}
         

 
export default Header;

