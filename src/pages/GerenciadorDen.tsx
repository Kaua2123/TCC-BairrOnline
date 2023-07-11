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
      
      
      
      <section id='Gerenciador'>
        <aside id='menulateral'>{/*talvez eu mude dps(nao ta pronto pronto ainda)*/}
           <h3>Denuncias Reportadas</h3>
             <div className='Filtrar'>

              <p>Filtrar por</p>
              <select name="filtra" id="">
              <option value="tipo1">Descrição falsa</option>
               <option value="tipo2">Descrição Ofensiva</option>{/*discurso de ódio, racismo,ameaças sla*/}
                <option value="tipo3">Imagem Imprópria</option> {/*pornografia, Conteudo explicito(Ferimentos, lesoes sla), localização que pode revelar a casa dos outros */}
               <option value="tipo4">Informação pessoal demais</option>{/* Envolveu a vida pessoal demais na denuncia, coisa que nois nao precisa saber */}
              <option value="tipo5">Denuncia repetida</option>{/*Bora fazer regras dps*/} 
              </select>
              <br />
                <input type="submit" value="Filtrar" />
                <input type="reset" value="Limpar" />
                
             </div>     
             <h3>Comentarios</h3>
           </aside>

        <div className="GerPesquis">
          <input type="search" placeholder="Pesquisar" />
        </div>
    
           
            <div id='ConteudoReportado'>
              {/* CONECTAR COM O BACKEND PRA AS DENUNCIAS VIREM PRA CA */} 
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
                  <Link to="/Login" className='loginHome'> Fazer login</Link>

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