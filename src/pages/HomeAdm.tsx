import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Comentarios from '../components/Comentarios';
import { useState } from 'react';
import { Reportar } from '../components/reportar';

//componentes 
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';

const HomeADM = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (
  <ChakraProvider>
    <div className="omoço">

      <header>
      <nav className='navAdm'>
       <a className='logo' href='/'><img className='imgLogo' src={Logo} alt="LogoBairronline" /> </a>

        <div className="mobile-menu">

          <div className="line1"></div>

          <div className="line2"></div>

          <div className="line3"></div>

        
        </div>

 <ul className="nav-listADM">

          <li> <Link to="/VerDenuncia"> Denuncias </Link> </li>

          <li>  <Link to="/Gerenciar"> Tarefas  </Link></li>
           {/*
          <li> <Link to=""> Comentários Reportados </Link> </li>

          <li> <Link to=""> Denúncias Reportadas </Link> </li> Eu fiz uma pagina pros dois ficarem*/}
          <li>  <Link to=""> Usuários </Link></li>
          <li> <Link to=""> Bairros </Link></li>
           
          </ul>

       
       <div id='logcad'>
        <p>Pagina De Adminstração</p>{/*Fazer isso piscar depois, achei melhor colocar isso já que a Adm é uma Pagina restrita, ai eu tirei os botões de cadastro */}
        {/*adicionar um botão pra deslogar depois*/}
        </div>

        
      </nav>


    </header>
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
        <button onClick={() => {setOpenCom(true)}} className='btnOpen'>Abrir comentários
        <Comentarios isOpen={openCom} setCloseCom = {() => {setOpenCom(!openCom)}}>
        </Comentarios>
        </button>
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
 <h1 className="h1Org">Instituições Responsáveis</h1>
 <h2 className="subtituloOrg"> Veja aqui as instituições/órgãos públicos que mais resolveram problemas</h2>
</div>
<input className="inpOrg" type="search" placeholder='Pesquise por instituições/orgãos publicos aqui'></input>
 </article>


 </div>
</section>

    </body>
        
        <Footer/>
        
     </div>
     </ChakraProvider>

  );
}

export default HomeADM;