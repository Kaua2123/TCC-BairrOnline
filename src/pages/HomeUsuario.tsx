import '../App.css';
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import { useState } from 'react';
import imgdefault from "./../img/ImgDefault.png"

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

          <li>  <Link to="/VerDenuncia"> Acompanhar denúncias  </Link></li>

          <li>  <Link to="/MinhasDen"> Minhas denúncias  </Link></li>
          
         
          </ul>
       <div id='LogUsu'>
          
       </div>
        
      </nav>


    </header>
    <body>
      <section id='miranhatrem'>
      <article id='arti'>
        <h1 className='h1Den'>Suas denúncias</h1><br></br>
    </article>

  <article id='arti'>
    <div className='bordinhaUsu'>
  <h1 className='h1Usu'>Nenhuma denúncia foi assumida para resolução.</h1>
    </div>
  <h2 className='h2Usu'>Denúncias escolhidas pelas instituições aparecerão abaixo. </h2>
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