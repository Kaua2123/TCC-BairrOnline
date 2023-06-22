import { Link } from 'react-router-dom';
import instagram from '../img/instagram.png'
import twitter from '../img/twitter.png'
import '../App.css';
import Logo from '../img/logo.png';

const MinhasDen = () => {
    return (
        <div>
            
      <header>
      <nav>
      <a className='logo' href='/'><img className="imgLogo" src={Logo} alt="LogoBairronline" title='Logo' /> </a>
        <div className="mobile-menu">

         <div className="line1"></div>

         <div className="line2"></div>

        <div className="line3"></div>

         </div>
             <ul className="nav-list">

            <li> <Link to="/Denuncie"> Denuncie aqui </Link> </li>

            <li>  <Link to="/VerDenuncia"> Ver Denúncias  </Link></li>

            <li>  <Link to="/MinhasDen"> Minhas Denúncias  </Link></li>

            <li>  <Link to="/Cadastro"> <button className='btnCadastro'>  Cadastrar-se </button> </Link></li>

            <li> <Link to="/Login">Fazer login</Link></li>
            </ul>
        </nav>


        </header>

 <body>
    <article className='articleProvisorio'> <h1 className='textoProvisorio'> Minhas denúncias </h1></article>
 </body>


        <footer className="container">

<div className="item1">
  <ul className="texto">
    <li className="logoFooter"> <a className='logo' href='/'><img className="imgLogo" src={Logo} alt="LogoBairronline"  /> </a></li>
  </ul>
</div>

    <div className="item2">
      <ul className="texto">

        <li className="xd">Usuário</li>
          <li><a href="#">Início</a></li>
          <li><a href="#">Cadastre-se</a></li>
          <li><a href="#">Entrar</a></li>

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
    )
}

export default MinhasDen;