import '../App.css';
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'



const Gerenciador = () => {

 return (
    <div>

      <header>
      <nav className=''>
       <a className='logo' href='/'><img className='imgLogo' src={Logo} alt="LogoBairronline" /> </a>

        <div className="mobile-menu">

          <div className="line1"></div>

          <div className="line2"></div>

          <div className="line3"></div>

        </div>
        <ul className="nav-list">

          <li> <Link to="/VerDenuncia"> Denuncias </Link> </li>

          <li>  <Link to="/VerDenuncia"> Usuários </Link></li>
          
          <li> <Link to="">Bairros</Link></li>

        </ul>
       <div id='logcad'>
       <p>Pagina De Adminstração </p>
       </div>
        
      </nav>


    </header>
    <body className='Gerbodi'>
      
      <label htmlFor="GerCoisas"><p>Denuncias e Comentarios Reportados</p></label>
      <section className='GerCoisas'>
      
        <div className="GerPesquis">
          <input type="search" placeholder="Pesquisar" />
        </div>
         <section id='GerConteudo'>
        <div className=''>
           <h1>Denuncias e comentarios reportados ficam aqui</h1>
           
        </div>
         </section>
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

export default Gerenciador;