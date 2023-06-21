import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";


import  { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className="omoço">

      <header>
      <nav>
        <a className="logo" href="/">BairrOnline</a>
        <div className="mobile-menu">

          <div className="line1"></div>

          <div className="line2"></div>

          <div className="line3"></div>

        </div>
        <ul className="nav-list">

          <li> <Link to="/Denuncie"> Denuncie aqui </Link> </li>

          <li>  <Link to="/VerDenuncia"> Ver Denúncias  </Link></li>

          <li>  <Link to="/MinhasDen"> Minhas Denúncias  </Link></li>

          <li>  <Link to="/Cadastro"> <button id='btnCadastro'>  Cadastrar-se </button> </Link></li>

          <li> <Link to="/Login">Fazer login</Link></li>
        </ul>
      </nav>


    </header>
    <body>
    <article className="artiDenuncia">

<h1 className="denunciasTrending">Denúncias em destaque</h1>
<h2 className="subtituloDenuncia">Denúncias em Alta do Bairro de Volta Redonda</h2>

<img src={img2}alt="Imagem" className="imgArt"title="agua estancada"/>


 <label htmlFor="den"><button className="btnDenuncia">Ver denúncia</button></label>

  <h2 className="tituloDenuncia">El agua estas estancada</h2>
  <h2 className="textoDenuncia">Agua estancada en el barrio Jd Cidade do Aço y nadie hace nada  </h2>

</article>

<div className="divArticles">
<article className="artiOrg">

<h1 className="h1Org">Instituições Responsáveis</h1>

</article>

<article className="artiFiltro">
    <input className="inpFiltro" type="text" placeholder='Pesquise por bairros e denúncias aqui...'></input>
    
</article>
</div>
    </body>
        
        <footer className="container">

        <div className="item1">
          <ul className="texto">
            <li className="logoFooter">BairrOnline</li>
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
}

export default Home;