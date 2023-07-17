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

//ALTERAR A HOME TLGD O DESIGN TLGD PQ ELA TA COMO USUARIO MAS É PRA SER DESLOGADA OU SEJA MUDAR AS OPSOES
const Home = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);
  const [OpenTaf , setOpenTaf] = useState(false);

 return (
    <ChakraProvider>

      <Flex w='100%'  bg='#322F2F' boxShadow='xl' > 

          <Center>
          <Menu>
            <MenuButton bg='#322F2F' color='white' as={IconButton} aria-label="opções" icon = {<MenuOutlined/>}></MenuButton>
            <MenuList>
            <MenuItem  >BairrOnline</MenuItem>
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
                  <Link to='/Denuncie'> Ver denúncias </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'>
                 <Link to='/VerDenuncia'> Denúncias avaliadas </Link>
              </Button>
              <Button variant='link'
              color='white' 
              _hover={{color: '#338BB0'}}
              fontFamily='BreeSerif-Regular'
              fontWeight='normal'
              ml='20px'>
                 <Link to='/'> Denúncias assumidas </Link>
              </Button> 
            </HStack>
            <Spacer/>

            <HStack spacing='4'>
              <Button colorScheme='blackAlpha' _hover={{backgroundColor: 'white', color: '#338bb0'}}> <Link to='/Cadastro'> Cadastre-se </Link> </Button>
              <Button colorScheme='blackAlpha' _hover={{backgroundColor: 'white', color: '#338bb0'}} mr='4' >  <Link to='/Login'> Login </Link></Button>
            </HStack>
          

      </Flex>
    <body>
      <section id='miranhatrem'>
      <article id='arti'>
    
        <h1 className='h1Den'>Denúncias em destaque</h1><br></br>
        <h2 className='subtituloden'>Denúncias em Alta do Bairro de Volta Redonda</h2>

         <img src={img2}alt="Imagem" className="imgArt"title="agua estancada"/>

        <div className='verDen'>
         <label htmlFor="den"><button className="btnDenuncia">Ver denúncia</button></label>
        </div>
         <h2 className='tituloden'>El agua estas estancada</h2>
         <h2 className='descricaoden'>Agua estancada en el barrio Jd Cidade do Aço y nadie hace nada  </h2>
        <button onClick={() => {setOpenCom(true)}} className='btnOpen'>Abrir comentários</button>
        <Comentarios isOpen={openCom} setCloseCom = {() => {setOpenCom(!openCom)}}>
        </Comentarios>
        <button onClick={() => {setOpenTaf(true)}} className='btnTarefa'>Assumir denúncia</button>
        <AssumirTarefa Aberto={OpenTaf} setOpenTaf = {() => {setOpenTaf(!OpenTaf)}}>
        </AssumirTarefa>

        <div id='reportar'>
           <button id="btnrep" onClick={()=>{setrep(true)}}>reportar</button>
           <Reportar taAberto={rep} tafechado={()=>{setrep(!rep)}}/>
          </div>
    </article>

  <div className="divArticles">
  <article className="artiFiltro">
    <input className="inpFiltro" type="search" placeholder='Pesquise por bairros e denúncias aqui...'></input>
    
 </article>
 <article className="artiOrg">
<div className='bordinha'>
 <h1 className="h1Org">Denúncias assumidas</h1>
 <h2 className="subtituloOrg"> Veja aqui as denúncias assumidas por você, orgão ou instituição</h2>
</div>

<div className='rolagemInst'> <h1>OI</h1></div> 
 </article>


 </div>
</section>

    </body>
        
      <Footer/>
    </ChakraProvider>

  );
}

export default Home;