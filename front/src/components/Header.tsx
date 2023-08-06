
//chakra
import { Menu,Image, MenuButton, Button, IconButton, MenuList, MenuItem,
  Center, Flex, HStack, Spacer,Popover,PopoverTrigger,
  PopoverContent,PopoverHeader,PopoverBody, 
  PopoverArrow, PopoverCloseButton} from "@chakra-ui/react";
import { Avatar, Box } from "@chakra-ui/react";

//react
import { HashLink as Link } from 'react-router-hash-link';



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
      <Flex w='100%'  bg='#322F2F' boxShadow='lg' position={"sticky"} top={0} zIndex={2}> 

          <Center>  
          <Menu>
            <MenuButton display={['flex', 'flex', 'none', 'none']} bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
              <MenuItem > <Link to='/'> BairrOnline </Link> </MenuItem>
              <MenuItem> <Link to='/Denuncie'> Denuncie aqui </Link> </MenuItem>
              <MenuItem> <Link to='/VerDenuncia'> Ver denúncias </Link></MenuItem>
              <MenuItem> <Link to='/SaibaMais'> Saiba mais </Link></MenuItem>
            </MenuList>
          </Menu>
          </Center>

          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>

          <Spacer/>
          
            <HStack w={{base: '24px', sm:'200px'}} spacing='24' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>
                  <Link to='/Deslogado'> Denuncie aqui</Link>
                  {/* vai levar pra pagina de deslogado, ver uma forma de autenticar se o usuario 
                  ta logado ou nao pra qnd ele clicar ir direto pra pagina de denunciar. ou ja usar
                  o nav do usuario msm */}
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>
                 <Link to='/VerDenuncia'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>
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
  
      <Flex w='100%'  bg='#322F2F' boxShadow='dark-lg' > 


{/*COMEÇA HEADERUSU NAV*/}
        
          <Center>  
          <Menu>
            <MenuButton display={['flex', 'flex', 'none', 'none']} bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
              <MenuItem > <Link to='/'> BairrOnline </Link> </MenuItem>
              <MenuItem> <Link to='/Denuncie'> Denuncie aqui </Link> </MenuItem>
              <MenuItem> <Link to='/VerDenuncia'> Ver denúncias </Link></MenuItem>
              <MenuItem> <Link to='/SaibaMais'> Saiba mais </Link></MenuItem>
            </MenuList>
          </Menu>
          </Center>
          
          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>



          <Spacer/>
          
            <HStack w='25%' spacing='20' mr='50px' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>
                  <Link to='/HomeUsuario#denuncieAqui'> Denuncie aqui</Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              ml='20px'
              display={['none', 'none', 'flex', 'flex']}>
                 <Link to='/VerDenuncia'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              ml='40px'
              display={['none', 'none', 'flex', 'flex']}>
                 <Link to='/'> Acompanhar denuncias </Link>
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
                   <PopoverBody display={'flex'} h={'800px'} maxW={'600px'} maxHeight={'maxcontent'} overflowY={'auto'} flexDirection={'column'} padding={'0'} alignItems={'flex-start'}>
                   
                    <NotfiInst/>
                    <NotfiInst/>
                    <NotfiInst/>
                    <NotfiInst/>
                  
                  
                  </PopoverBody>
                  </PopoverContent>
                </Popover>
               
              <Avatar icon={ <FaUserAlt/> }/>
            </HStack>
           </Box>


  {/* TERMINA NOTIFICAÇÃO */}
      </Flex>
    
      
  )
}

export const HeaderInst = () => {
  return(
      <Flex w='100%'  bg='#322F2F' boxShadow='dark-lg' position={"sticky"} top={0} zIndex={2}> 

          <Center>  
            <Menu>
              <MenuButton display={['flex', 'flex', 'none', 'none']} bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
              <MenuList>
                <MenuItem > <Link to='/'> BairrOnline </Link> </MenuItem>
                <MenuItem> <Link to='/Denuncie'> Denuncie aqui </Link> </MenuItem>
                <MenuItem> <Link to='/VerDenuncia'> Ver denúncias </Link></MenuItem>
                <MenuItem> <Link to='/SaibaMais'> Saiba mais </Link></MenuItem>
              </MenuList>
            </Menu>
          </Center>


          <Link to='/'> <Image src={Logo} alt='logo' boxSize='20' ></Image> </Link>

          <Spacer/>
          <Center>
            <HStack w='25%' spacing='20' mr='50px' >
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              mr='45px'
              display={['none', 'none', 'flex', 'flex']}>
                  <Link to='/VerDenuncia'>Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              mr='20px'
              display={['none', 'none', 'flex', 'flex']}>
                 <Link to=''>Denúncias avaliadas </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>
                 <Link to=''>Tarefas</Link>
              </Button> 
            </HStack>
            </Center>
            <Spacer/>

            <HStack spacing='4'>
              <Button colorScheme='blackAlpha' leftIcon={<AiOutlineUser/>} _hover={{backgroundColor: 'white', color: '#338bb0'}}> <Link to='/Cadastro'> Cadastre-se </Link> </Button>
              <Button colorScheme='blackAlpha' leftIcon={<CgLogIn/>} _hover={{backgroundColor: 'white', color: '#338bb0'}} mr='4' >  <Link to='/Login'> Login </Link></Button>
            </HStack>
          

      </Flex>
  )
}
         

 
export default Header;

