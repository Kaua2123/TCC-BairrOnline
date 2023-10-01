
//chakra
import { Menu,Image, MenuButton, Button,  MenuList, MenuItem,
  Center, Flex, HStack, Spacer,Popover,PopoverTrigger,
  PopoverContent,PopoverHeader,PopoverBody,
  PopoverArrow, PopoverCloseButton, Badge, AvatarBadge, Text, useToast, useColorMode, Icon, MenuGroup } from "@chakra-ui/react";
import { Avatar, Box, IconButton } from "@chakra-ui/react";

//react
import { HashLink as Link } from 'react-router-hash-link';



//icones

import { CgLogIn } from 'react-icons/cg'
import { FaUserAlt, FaUserTie } from "react-icons/fa";
import Logo from '../img/logo.svg';
import { MenuOutlined } from "@ant-design/icons";
import { AiOutlineBell, AiOutlineUser  } from "react-icons/ai";
import { BiSolidInstitution } from 'react-icons/bi';
import { MdBusiness } from 'react-icons/md';
import { MdOutlineLogout } from 'react-icons/md';
import { PiGearSixFill } from 'react-icons/pi'
import {FaMoon, FaSun} from 'react-icons/fa'


//componentes
 import { NotificacaoDen } from "./NotificacaoDen";
import { useState, useEffect } from "react";

import axios from 'axios';
import { NotificacaoInst } from "./NotificacaoInst";


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

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [notLida, setNotLida] = useState(false);
  const [notNova, setNotNova] = useState(false);
  const [temNot, setTemNot] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const toast = useToast();
  const {colorMode, toggleColorMode} = useColorMode();

  const getUsuarios  = () => {

    const token = localStorage.getItem('token'); //token para proteção das rotas
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

    axios.get('http://localhost:3344/getUsuarioLogado')
    .then((response) => {
        setUsuarios(response.data);
    })
    .catch((error) => {
        console.log('Erro ao buscar usuarios', error)
    })
}

useEffect(() => {
    getUsuarios();
}, [])

  const deslogar = () => {
    try {
      localStorage.removeItem('token');
      toast({
        title: 'Você saiu',
        description: 'Recarregue para ver as alterações.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

    } catch (error) {
      console.error(error);
    }
  }

  const aoClicarAvatar = () => {
    setSubMenuOpen(!isSubMenuOpen);
  }


  async function getNotificacoes() {
     const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  }

  try {
    const response = await axios.get('http://localhost:3344/getNotificacoes');
    const notificacoesData = response.data;
    setNotificacoes(notificacoesData);

    const todasNotLidas = notificacoesData.every((notificacao) => notificacao.not_lida === false);
    setNotLida(todasNotLidas);

    if (notificacoesData.length > 0) {
      const notNaoLida = notificacoesData.some((notificacao) => notificacao.not_lida);
      setNotNova(notNaoLida);
    }

    if (!todasNotLidas) {
      localStorage.setItem('notificacoesVisualizadas', 'true');
    } else {
      localStorage.removeItem('notificacoesVisualizadas');
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getNotificacoes();

  const notificacoesVisualizadas = localStorage.getItem('notificacoesVisualizadas');
  if (notificacoesVisualizadas === 'true') {
    setNotLida(false);
  }
}, []);





  return(


      <Flex w={{base: '79vw', md: '100%'}}   bg={colorMode === 'light' ? '#322F2F' : 'gray.700'} boxShadow='lg' >


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

            <HStack spacing='10' justifyContent='center' alignItems='center' >
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>

                  <Link smooth to='/HomeUsuario#denuncieAqui'> Denuncie aqui</Link>

              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                 <Link smooth to='/VerDenuncia'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                 <Link smooth to='/HomeUsuario#minhasDen'> Minhas denúncias </Link>
              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                 <Link smooth to='/DenDetalhadas'> Denúncias detalhadas </Link>
              </Button>
            </HStack>

            <Spacer/>


{/*TERMINA HEADERUSU NAV*/}



  {/* COMEÇA NOTIFICAÇÃO */}


            <Box display={'inherit'} alignSelf={'center'} paddingRight={'2vh'}>
              <HStack spacing={'20px'}>

              {/* <IconButton
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        colorScheme="whiteAlpha"

      /> */}
                <Popover>
                  <PopoverTrigger>
                  <Button variant={'ghost'} onClick={() => setNotLida(true)} size={'3em'} padding='4px' colorScheme="whiteAlpha" borderRadius={'full'} >
                  <AiOutlineBell  fill='white' size='2.6em' />
                  {notNova && !notLida  && (
                      <Badge
                      position="absolute"
                      top={9}
                      right={1}
                      bg="#338bb0"
                      borderRadius="full"
                      w="10px"
                      h="10px"
                    ></Badge>
                  )}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent w={'max-content'} height={'400px'} overflowY={'auto'}>
                  <PopoverArrow/>
                  <PopoverCloseButton/>
                    <PopoverHeader textAlign={'center'}
                     background={'#338BB0'} //<-- FAZER CORES PERSONALIZADAS DEPOIS PQ O CHAKRA NAO ACEITA RGB >:(
                     color={'white'}
                     fontFamily='BreeSerif-Regular'
                     fontSize={'15pt'}
                     letterSpacing={'1px'}>

                    <p>Notificações</p>
                   </PopoverHeader>
                   <PopoverBody display={'flex'} h={'800px'} maxW={'600px'} maxHeight={'maxcontent'} overflowY={'auto'} flexDirection={'column'} padding={'0'} alignItems={'flex-start'}>

          {notificacoes.map((notificacao) => (
            <NotificacaoDen key={notificacao.not_cod} notCod={notificacao.not_cod} notificacao={notificacao} />
          ))}




                  </PopoverBody>
                  </PopoverContent>
                </Popover>


                <Menu isOpen={isSubMenuOpen}>
          <MenuButton
            as={Button}
            variant="ghost"
            size="3em"
            padding="4px"
            colorScheme="whiteAlpha"
            borderRadius="full"
            onClick={aoClicarAvatar} // Chama a função quando o avatar é clicado

          >

          {usuarios.map((usuario, index) => (
          <Box key={index}>
          {usuario.usu_img ? (
            <Avatar src={`http://localhost:3344/retornaImgPerfil/${usuario.usu_img}`} />
          ) : (
            // Caso usuário não tenha imagem, renderiza um Avatar com um ícone padrão
            <Avatar icon={<FaUserAlt />} />
          )}
       
        </Box>
          ))}
           
          </MenuButton>
          <MenuList>
            <MenuGroup title='Perfil'>
            {/* Opções de menu */}
            <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            ><Link to='/MeuPerfil'>Meu Perfil</Link></MenuItem>
             <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            ><Link to='/HomeUsuario'>Seção do Usuário </Link></MenuItem>
            </MenuGroup>
            <MenuGroup title='Ajuda'>
            {/* Opções de menu */}
            <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            ><Link to='/MeuPerfil'>Saiba mais</Link></MenuItem>
             <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            ><Link to='/HomeUsuario'>Seção do Usuário </Link></MenuItem>
            </MenuGroup>
            <MenuItem onClick={deslogar}
            _hover={{ bg: 'red.500', color: 'white' }}
            icon={<MdOutlineLogout size='20px' />}>Sair</MenuItem>
          </MenuList>
        </Menu>

            </HStack>
           </Box>


  {/* TERMINA NOTIFICAÇÃO */}
      </Flex>


  )
}

export const HeaderInst = () => {

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const {colorMode, toggleColorMode} = useColorMode();
  const toast = useToast();

  const deslogar = () => {
    try {
      localStorage.removeItem('token');
      toast({
        title: 'Você saiu',
        description: 'Recarregue para ver as alterações.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

    } catch (error) {
      console.error(error);
    }
  }


  const aoClicarAvatar = () => {
    setSubMenuOpen(!isSubMenuOpen);
  }

  return(



      <Flex w='100%'  bg={colorMode === 'light' ? '#322F2F' : 'gray.700'}  boxShadow='lg' position={"sticky"} top={0} zIndex={2}>

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
            <HStack  spacing='10' justifyContent='center' alignItems='center' >
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                  <Link to='/VerDenuncia'>Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                 <Link to=''>Denúncias avaliadas </Link>
              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>
                 <Link to='/Tarefas'>Tarefas</Link>
              </Button>
            </HStack>
            </Center>
            <Spacer/>

            <Box display={'inherit'} alignSelf={'center'} paddingRight={'2vh'}>
              <HStack spacing={'20px'}>

              {/* <IconButton
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun color='white' />}
        onClick={toggleColorMode}
        colorScheme="whiteAlpha"

      /> */}

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

                    <NotificacaoInst/>
                    <NotificacaoInst/>
                    <NotificacaoInst/>
                    <NotificacaoInst/>


                  </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Menu isOpen={isSubMenuOpen}>
          <MenuButton
            as={Button}
            variant="ghost"
            size="3em"
            padding="4px"
            colorScheme="whiteAlpha"
            borderRadius="full"
            onClick={aoClicarAvatar} // Chama a função quando o avatar é clicado
          >
            <Avatar icon={<MdBusiness  size='30px'/>} />
          </MenuButton>
          <MenuList>
          <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
          ><Link to='/MeuPerfil'>Meu Perfil </Link> </MenuItem>

            <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            ><Link to='/HomeInst'>Seção do Usuário </Link></MenuItem>
            <MenuItem onClick={deslogar}
            _hover={{ bg: 'red.500', color: 'white' }}
            icon={<MdOutlineLogout size='20px' />}>Sair</MenuItem>
          </MenuList>
        </Menu>

            </HStack>
           </Box>




      </Flex>
  )
}

export const HeaderADM = () => {

  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const toast = useToast();
  const {colorMode, toggleColorMode} = useColorMode();

  const deslogar = () => {
    try {
      localStorage.removeItem('token');
      toast({
        title: 'Você saiu',
        description: 'Recarregue para ver as alterações.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })

    } catch (error) {
      console.error(error);
    }
  }

  const aoClicarAvatar = () => {
    setSubMenuOpen(!isSubMenuOpen);
  }



  return(


      <Flex w='100%' bg={colorMode === 'light' ? '#322F2F' : 'gray.700'} boxShadow='lg' >


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

            <HStack  spacing='10' justifyContent='center' alignItems='center' >
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              display={['none', 'none', 'flex', 'flex']}>

                  <Link smooth to='/HomeADM'>Gestão de denúncias</Link>

              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                 <Link smooth to='/HomeADM'>Conteúdo reportado</Link>
              </Button>
              <Button variant='link'
              color='white'
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'

              display={['none', 'none', 'flex', 'flex']}>
                 <Link smooth to='/HomeADM'>Usuários</Link>
              </Button>

            </HStack>

            <Spacer/>









            <HStack m={3}>

            <Menu isOpen={isSubMenuOpen} >
          <MenuButton
            as={Button}
            variant="ghost"
            size="3em"
            padding="4px"
            colorScheme="whiteAlpha"
            borderRadius="full"
            onClick={aoClicarAvatar} // Chama a função quando o avatar é clicado

          >
            <Avatar icon={<FaUserTie />} />
          </MenuButton>
          <MenuList>
            {/* Opções de menu */}
            <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            icon={<AiOutlineUser size='20px'/>}>Meu Perfil</MenuItem>

             <MenuItem _hover={{ bg: '#338BB0', color: 'white' }}
            ><Link to='/HomeADM'>Administração </Link></MenuItem>
            <MenuItem onClick={deslogar}
            _hover={{ bg: 'red.500', color: 'white' }}
            icon={<MdOutlineLogout size='20px' />}>Sair</MenuItem>
          </MenuList>
        </Menu>


            </HStack>



      </Flex>


  )
}



export default Header;
