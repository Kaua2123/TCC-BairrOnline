import '../App.css';
import img2 from "../img/aguaEstancada.png";

import Logo from "../img/logo.svg";

import Comentarios from './Comentarios';
import { useState } from 'react';
import { Reportar } from './reportar';
import { ChakraProvider, Center, Box, Flex, Image, Text, Container } from '@chakra-ui/react';

//componentes
import Header from '../components/Header';
import Footer from '../components/Footer';



const Home = () => {
  const [rep , setrep] = useState(false)
  const [openCom, setOpenCom] = useState(false);

 return (

  // 
  <ChakraProvider>
      <Header/>
          <Flex >
                <Box bgColor='#338BB0' h='xl' w='100%'>
                  <Center>
                      <Image src={Logo} boxSize='480px' />
                  </Center>
                    <Container centerContent ml='-3' w='100' mt='-80' >
                      <Text  color='white' textDecoration='underline' fontFamily='BreeSerif-Regular' fontSize='28pt'>Com problemas no bairro?</Text>
                      <Text textAlign='center'  color='white'  fontFamily='BreeSerif-Regular' fontSize='14pt'  fontWeight='normal'>Relate suas denúncias aqui,
                      e tenha o retorno das instituições 
                      responsáveis pela resolução dos problemas
                      </Text>
                   </Container>

                    <Container centerContent mt='52'>
                      <Text color='white' fontSize='30pt' fontFamily='BreeSerif-Regular'>Seu portal de denúncias</Text>
                    </Container>

                     <Container centerContent mr='20px' w='100' mt='-374px  ' >
                      <Text  color='white' textDecoration='underline' fontFamily='BreeSerif-Regular' fontSize='28pt'>Veja outras denúncias</Text>
                      <Text textAlign='center'  color='white'  fontFamily='BreeSerif-Regular' fontSize='14pt'  fontWeight='normal'>Se mantenha informado quanto aos problemas
                      de seu bairro ou de outros bairros de Volta Redonda
                      </Text>
                   </Container>
                </Box>
         </Flex>




    
    <body>
     
      
      
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
        
       

     <Footer/>
     </ChakraProvider>
  );
}

export default Home;