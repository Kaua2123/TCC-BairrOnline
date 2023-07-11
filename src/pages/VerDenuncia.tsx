import { Link } from 'react-router-dom';
import '../App.css';
import Instagram from '../img/instagram.svg';
import twitter from '../img/twitter.png'
import Logo from '../img/logo.svg';
import { useState } from 'react';
import AssumirTarefa from './AssumirTarefa';

const bairros = ['Todos', 'Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte', 'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal', 'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia', 'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera', 'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês', 'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta', 'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];
const problemas = ['Buraco', 'Lixo', 'Luz'];



const VerDenuncia = () => {

  const [openCom, setOpenCom] = useState(false);

    return (
        <div>
 <header>
      <nav>
      <a className='logo' href='/'><img className="imgLogo" src={Logo} alt="LogoBairronline"  /> </a>
        <div className="mobile-menu">

          <div className="line1"></div>

          <div className="line2"></div>

          <div className="line3"></div>

        </div>  
      <ul className="nav-list">

          <li> <Link to="/Denuncie"> Denuncie aqui </Link> </li>

          <li>  <Link to="/VerDenuncia"> Ver denúncias  </Link></li>


        </ul>
        
      <div id='logcad'>
       <Link to="/Cadastro" > <button className='btnCadastro'>  Cadastrar-se </button> </Link>

       <Link to="/Login">Fazer login</Link>
      </div>


      </nav>


 </header>
 <body>
      <div className='acompanhar'>
    <h1 className='h1acompanhar'> Veja aqui as denúncias já enviadas </h1>
      </div>
      <div className='filtrar'>
      <label className='labelBairro' htmlFor="Filtro"> Bairros </label>
  <label className='labelFiltro' htmlFor="Filtro"> Problemas </label>
  
  <button className='btnFiltrar'>Aplicar</button>
  

    </div>
    <div className='organizarpor'>
    <h2 className='organizar'>Organizar por:</h2>
    <select className='slct1'>
      <option>Mais populares</option>
      <option>Mais recentes</option>
    </select>
    </div>
      <div className='denuncias'>
      
      </div>
 </body>

 <footer className="container">

<div className="item1">
  <ul className="texto">
    <li className="logoFooter"><a className='logo' href='/'><img className="imgLogo" src={Logo} alt="LogoBairronline"  /> </a></li>
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

        <li><a className='InstaLogo' href='https://www.instagram.com/BairrOnline'>  <img className="imgInsta" src={Instagram} alt="LogoInsta"  /></a></li>   
        <li> <img src={twitter} alt='Twitter' title="socialMedia"></img></li>

      </ul>

    </div>
</footer>
        </div>
    );
};  

export default VerDenuncia;