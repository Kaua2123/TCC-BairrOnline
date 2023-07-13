import '../App.css';
import img2 from "../img/aguaEstancada.png";
import instagram from "../img/instagram.png";
import twitter from "../img/twitter.png";
import Logo from "../img/logo.svg";
import  { Link } from 'react-router-dom'
import Comentarios from './Comentarios';
import { useState } from 'react';
import { Reportar } from './reportar';


//ALTERAR A HOME TLGD O DESIGN TLGD PQ ELA TA COMO USUARIO MAS É PRA SER DESLOGADA OU SEJA MUDAR AS OPSOES
const Home = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (
    <div>

      <header>
      <nav>
        <Link to="/"> <img className='imgLogo' src={Logo} alt="LogoBairronline" style={{fill: 'blue'}} /> </Link> 

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
      
       <Link to="/Login" className='loginHome'> Fazer login</Link>

       </div>
        
      </nav>


    </header>
    <body>
      <div className='quadradoazul'>
        <div className='container-fullscreen'>

      <div className='fullscreen'>
        <img src={Logo} className='logoFullscreen'/>
        <h1 className='h1Fullscreen'>Seu portal de denúncias</h1>
      </div>

        </div>

        <div className='container-textoEsquerda'>
          <div className='fullscreen2'>
            <h1 className='h1Fullscreen2'>Com problemas no bairro?</h1>
            <h2 className='h2Fullscreen'> Relate suas denúncias aqui, e tenha o <br /> retorno das instituições 
            responsáveis pela <br /> resolução dos problemas  </h2>
          </div>
        </div>


        <div className='container-textoDireita'> 
        <div className='fullscreen3'>
         <h1 className='h1Fullscreen3'>Veja outras denúncias</h1>
    <div className='container-texto'>
         <h2 className='h2Fullscreen2'> Se mantenha informado quanto aos <br />  problemas de seu bairro ou  
        de outros <br /> bairros de Volta Redonda </h2>
      
      </div>
        </div>
        </div>
      </div>
      
      <section id='miranhatrem'>
      <article id='arti'>
    
        <h1 className='h1Den'>Denúncias em destaque</h1><br></br>


        <div className='denuncias'> 
        <img src={img2}alt="Imagem" className="imgArt"title="agua estancada"/>  

        <div className='verDen'>
        <button className="btnDenuncia">Ver denúncia</button>
        </div>

        </div>
        

        

        <div className='textos'>

         <h2 className='tituloden'>El agua estas estancada</h2>
         <h3 className='descricaoden'>Agua estancada en el barrio Jd Cidade do Aço y nadie hace nada  </h3>
         </div>

        <div className='comentarios'>
        <button onClick={() => {setOpenCom(true)}} className='btnOpen'>Comentários</button>
        <Comentarios isOpen={openCom} setCloseCom = {() => {setOpenCom(!openCom)}}>
        </Comentarios>
        </div>
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
 <h1 className="h1Org">Instituições/Órgãos Públicos</h1>
 
</div>
<input className="inpOrg" type="search" placeholder='Pesquise por instituições/orgãos publicos aqui'></input>
<div className='rolagemInst'> 
<h1 className='h1Inst'>@VRsaneamento</h1> 
 <h1 className='h1Inst'>@VRsaneamento</h1> 
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>
 <h1 className='h1Inst'>@VRsaneamento</h1>

</div>
 </article>



 </div>
</section>  
     <div className='containerSobre'>
<div className='sobreNos'>

  <h2 className='tituloSobre'>O que é o Bairronline?</h2>
  
  <div className='textoSobre'>

  BairrOnline é uma aplicação com o foco de facilitar a realização das denúncias referentes a 
  estrutura de bairros de Volta Redonda, e relatar os mesmos para as instituições relacionadas, dando visibilidade e
  por conseguinte uma maior chance de resolução dos problemas relatados. Em outras palavras, um portal de denúncias.

  </div>
  
  <h2 className='tituloSobre'>Que funções o BairrOnline tem a oferecer?</h2>
  <div className='textoSobre'>

  O usuário, como denunciante, poderá efetuar as denúncias e visualizar as denúncias de outros usuários. Estas, serão 
  encaminhadas para as instituições, que decidirão se irão assumir a denúncia para resolver, ou não. Caso assumam alguma 
  denúncia, esta será exibida para o usuário, que poderá acompanhar a resolução.

  </div>

  <h2 className='tituloSobre'>Por que escolher o BairrOnline?</h2>
  <div className='textoSobre'>

  Nossa proposta com o BairrOnline, é fazer com que as denúncias tenham visibilidade e sejam de realmente notadas pelas instituições.
  Faremos o nosso melhor para que de fato, seja uma aplicação eficiente e que satisfaça às expectativas dos usuários da mesma.
  
  </div>

  <h2 className='tituloSobre'>Quem somos</h2>
  <div className='textoSobre'>
  {/*se botar em quadradinhos com algum texto fica mais legal, tipo os quadradinhos da decolar*/}
  Gabriel
  <br />
  Kauã
  <br />
  Lucas
  <br />
  Nattan
  <br />
  Rayan
  <br />
  Thales
  <br />
  

  </div>



  
 </div>
     </div>
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

export default Home;