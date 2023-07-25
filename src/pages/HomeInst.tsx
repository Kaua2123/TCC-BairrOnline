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