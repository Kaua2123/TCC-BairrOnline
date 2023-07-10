import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Sinin from './../img/notification-bell-svgrepo-com.svg'

import { useState } from 'react';


const HomeUsuario = () => { 
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (
    <div>

      <header>
      <nav>
       <a className='logo' href='/'><img className='imgLogo' src={Logo} alt="LogoBairronline" /> </a>

        <div className="mobile-menu">

          <div className="line1"></div>

          <div className="line2"></div>

          <div className="line3"></div>

        </div>
        <ul className="nav-list">

          <li> <Link to="/Denuncie"> Denuncie aqui </Link> </li>

          <li>  <Link to="/VerDenuncia"> Ver denúncias </Link></li>

          <li>  <Link to="/AcompDenuncia"> Acompanhar denúncias  </Link></li>
          
         
          </ul>
          <img src={Sinin} className='sininho'/>
       <div id='LogUsu'>     
           <p>U</p>{/*Fazer um modal tipo do github aqui*/}
       </div>
        
      </nav>


    </header>
    <body>
      <section id='miranhatrem'>
      <article className='artiUsuario' id='barraRolagem'>
        <h1 className='h1Den'>Suas denúncias</h1><br></br>  
        <div className='containerUsu'>

          <div className='denunciasUsu'>
            <img src={img2} alt="imagem" className='imgUsu' />
            <br />
            <h2>sei n tlgd</h2>
            <h2>14:23 </h2>
            <h2>19/02/2002</h2>
          </div>

          <div className='denunciasUsu'>
            <img src={img2} alt="imagem" className='imgUsu' />
            <br />
            <h2>TITULO</h2>
            <h2>00:00 HORA</h2>
            <h2>04/04/2009 DATA</h2>
         </div>

    
         
        </div>
        <h3 className='h3Den'> <Link className='linkVermais' to="/MinhasDen"> Ver mais </Link> </h3>
    </article>

  <article id='arti'>
    <div className='bordinhaUsu'>
  <h1 className='h1Usu'>Nenhuma denúncia foi assumida para resolução.</h1>
    </div>
    <div className='containerUsu2'> </div>
  <h2 className='h2Usu'>Denúncias escolhidas pelas instituições aparecerão abaixo. </h2>
  <nav className='UsuNav'></nav>
 </article>



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

export default HomeUsuario;