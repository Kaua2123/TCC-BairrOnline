import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Comentarios from './Comentarios';
import { useState } from 'react';

const HomeADM = () => {

  const [openCom, setOpenCom] = useState(false);

 return (
    <div className="omoço">

      <header>
      <nav>
       <a className='logo' href='/'><img className='imgLogo' src={Logo} alt="LogoBairronline" /> </a>

        <div className="mobile-menu">

          <div className="line1"></div>

          <div className="line2"></div>

          <div className="line3"></div>

        </div>
        <ul className="ListaADM">
          <Link to="/VerDenuncia"> denúncias </Link>

           <ul id="ULSEP"><Link to="/"> Tarefas </Link>
           <li><a>Comentários Reportado</a></li>
           <li><a>Denúncias Reportado</a></li>
           <li><a>usuários?</a></li>
           </ul>
          
         
          </ul>
       <div id='logcad'>
       
       
       <Link to="/Cadastro" > <button className='btnCadastro'>  Cadastrar-se </button> </Link>

       <Link to="/Login">Fazer login</Link>

       
       </div>
        
      </nav>


    </header>
    <body>
      <section id='miranhatrem'>
      <article id='arti'>
    
        <h1 className='h1Den'>Denúncias em destaque</h1><br></br>
        <h2 className='subtituloden'>Denúncias em Alta do Bairro de Volta Redonda</h2>

         <img src={img2}alt="Imagem" className="imgArt"title="agua estancada"/>


         <label htmlFor="den"><button className="btnDenuncia">Ver denúncia</button></label>

         <h2 className='tituloden'>El agua estas estancada</h2>
         <h2 className='descricaoden'>Agua estancada en el barrio Jd Cidade do Aço y nadie hace nada  </h2>
        <button onClick={() => {setOpenCom(true)}} className='btnOpen'>Abrir comentários</button>
        <Comentarios isOpen={openCom} setCloseCom = {() => {setOpenCom(!openCom)}}>
        </Comentarios>
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
        
        <footer className="container">

        <div className="item1">
          <ul className="texto">
            <li className="logoFooter"><a className='bairrOnlineLogo' href='#'>  <img className="imgLogo" src={Logo} alt="LogoBairronline"  /></a></li>
          </ul>
        </div>

            <div className="item2">
              <ul className="texto">

                <li className="xd">Usuário</li>
                  <li><a href="#">Início</a></li>
                  <li><Link to="/Cadastro">Cadastre-se</Link></li>
                  <li><Link to="/Login">Entrar</Link></li>

              </ul>
            </div>

            <div className="item3">
               <ul className="texto">

                <li className="xd">Saiba mais</li>

                <li><a href="#">Sobre nós</a></li>
                  <li><a href="#">Perguntas frequentes</a></li>
                  <li><a href="#">Regras gerais</a></li>

              </ul>
            </div>

            <div className="item4">
              <ul>

                <li> <img src={instagram} alt='Instagram' title="socialMedia"></img> </li>    
                <li> <img src={twitter} alt='Twitter' title="socialMedia"></img></li>

              </ul>

            </div>
     </footer>
     </div>

  );
}

export default HomeADM;