import { Link } from 'react-router-dom';
import '../App.css';
import Instagram from '../img/instagram.svg';
import twitter from '../img/twitter.png'
import Logo from "../img/logo.svg";
import Camera from "../img/camera.png";
import {useState} from "react";




const Denuncie = () => {

  const [img, setImg] = useState<File | null>(null);

  const uploadImg = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Upload imagem')
    console.log(img);
  } 

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

          <li>  <Link to="/VerDenuncia"> Acompanhar denúncias   </Link></li>

          <li>  <Link to="/MinhasDen"> Minhas Denúncias  </Link></li>

        </ul>

      <div id='logcad'>
       <Link to="/Cadastro" > <button className='btnCadastro'> Cadastrar-se </button> </Link>

       <Link to="/Login">Fazer login</Link>
      </div>
      </nav>
 </header>
 <body>
      <div className='centralizafdp'> 
      <div className='bordinhaDen'>
  
      <h1 className='h1Denuncie'> Realize sua denúncia </h1>
      </div>
      </div>
    <div className='cadastroDen'>
      <form method='post' action='' onSubmit={uploadImg}>

          
        <br />  
        <label className='labelForm' htmlFor="titulo"> Título da Denúncia </label>
        <input type='text' className='inpForm' name='titulo' maxLength={50} required/>  
        <label className='labelForm' htmlFor="descDen"> Digite aqui o que está lhe incomodando em seu bairro </label>
        <textarea required className='inpForm'/>
        <label className='labelForm' htmlFor='imgDen'>Enviar imagem</label>

        <input type="file" className='btnImg' name='image' onChange={e => { const file = e.target.files?.[0] || null; setImg(file); }}/>  
        <br></br>
        <br></br>

        {img ? <img src={URL.createObjectURL(img)} alt='img' width={150} height={150} color='green'></img> : <img src={Camera} alt='img' width={150} height={150}/>} 

        <input className='btnForm' type='submit'/>
        <input className='btnForm' type='reset' value="Limpar"/>
        </form>
      </div>
  
  


 
      
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

      <li><a className='InstaLogo' href='https://www.instagram.com/BairrOnline'>  <img className="imgInsta" src={Instagram} alt="LogoInsta"  /></a></li>     
        <li> <img src={twitter} alt='Twitter' title="socialMedia"></img></li>

      </ul>

    </div>
</footer>
        </div>
    );
};  

export default Denuncie;