
import { MenuOutlined } from "@ant-design/icons";
import { Menu, MenuButton, Button, IconButton, MenuList, MenuItem,  Center, Flex, HStack, Spacer, Image} 
from "@chakra-ui/react";
import {Link} from 'react-router-dom';


//icones
import { AiOutlineUser } from 'react-icons/ai'
import { CgLogIn } from 'react-icons/cg'

import Logo from '../img/logo.svg';




const Header = () => {
  return(
      <Flex w='100%'  bg='#322F2F' boxShadow='dark-lg' > 

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


export default Header;