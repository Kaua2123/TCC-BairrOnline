import { Link } from 'react-router-dom';
import '../App.css';
import Instagram from '../img/instagram.svg';
import twitter from '../img/twitter.png'
import Logo from "../img/logo.svg";
import Camera from "../img/camera.png";
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';

//componentes
import Header from '../components/Header';
import Footer from '../components/Footer';




const bairros = ['Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte',
 'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal',
  'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia', 
  'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera',
   'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês',
    'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta', 
  'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];


const Denuncie = () => {

  const [img, setImg] = useState<File | null>(null);  

  

  (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Upload imagem')
    console.log(img);
  } 


    return (

      <ChakraProvider>
          <Header/>
      

        
 <body>
      <section className='responsivoDenuncie'>
      <div className='centralizafdp'> 
      <div className='bordinhaDen'>
  
      <h1 className='h1Denuncie'> Realize sua denúncia </h1>
      </div>
      </div>
    <div className='cadastroDen'>
      
      <form method='post' action='http://localhost:3344/criarDenuncia' >

        
        <label className='labelForm' htmlFor='protocolo/id' > <h3>Protocolo da denúncia: </h3> </label>
        <label className='labelForm' htmlFor="titulo"> <h3> Título da denúncia: </h3> </label>
      <input 
         type='text'  
         className='inpForm'
         name='den_nome' 
         maxLength={50} 
         required 
      
      />  
        <label className='labelForm' htmlFor="descDen"> <h3> Digite aqui o que está lhe incomodando em seu bairro: </h3> </label>
      <textarea  
        className='inpForm' 
        required 
        name='den_desc'
      />
 
       <label className='labelForm' htmlFor="selectBairro"> <h3> Selecione o bairro que deseja denunciar: </h3> </label>
        <select className='slctDenuncia'>
      <option disabled ></option>
       {bairros.map((bairro, index) => (
      <option key={index} value={bairro}>
       {bairro}
      </option>
    ))}
      </select>
        
        <label className='labelForm' htmlFor='imgDen'><h3> Enviar imagem </h3></label>
        <input type="file" className='btnImg' name='image' onChange={e => { const file = e.target.files?.[0] || null; setImg(file); }}/>  
        <br />
        {img ? <img src={URL.createObjectURL(img)} alt='img' width={150} height={150} color='green'></img> : <img src={Camera} alt='img' width={150} height={150}/>} 
        <br />
        <input className='btnForm' type='submit' />
  
        </form>
      </div>
      </section>
        
  


 
      
 </body>

         <Footer/>
      </ChakraProvider>
    );
};  

export default Denuncie;