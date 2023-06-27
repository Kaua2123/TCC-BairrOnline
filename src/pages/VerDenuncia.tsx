import { Link } from 'react-router-dom';
import '../App.css';
import instagram from '../img/instagram.png';
import twitter from '../img/twitter.png'
import Logo from '../img/logo.svg';

const bairros = ['Aterrado', 'Vila', 'Amaral Peixoto'];
const problemas = ['Buraco', 'Lixo', 'Luz'];



const VerDenuncia = () => {
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

          <li>  <Link to="/VerDenuncia"> Acompanhar denúncias  </Link></li>

          <li>  <Link to="/MinhasDen"> Minhas denúncias  </Link></li>

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
      <h2 className='h2filtro'>Filtro de denúncias</h2>
      <label className='labelFiltro' htmlFor="Filtro"> Bairro: </label>
      <select>
{bairros.map((bairro, index) => (
  <option key={index} value={bairro}>
    {bairro}
  </option>
))}
</select>
 <br></br><br></br>

  <label className='labelFiltro' htmlFor="Filtro"> Problema específico: </label>
  <select>
{problemas.map((problema, index) => (
  <option key={index} value={problema}>
    {problema}
  </option>
))}
</select>





<div>
  <button className='btnFiltrar'>Filtrar</button>
  </div>
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

        <li> <img src={instagram} alt='Instagram' title="socialMedia"></img> </li>    
        <li> <img src={twitter} alt='Twitter' title="socialMedia"></img></li>

      </ul>

    </div>
</footer>
        </div>
    );
};  

export default VerDenuncia;