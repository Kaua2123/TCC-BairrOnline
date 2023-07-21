
//Estilo
import '../App.css';

//Componentes
import Footer from '../components/Footer';

//React
import  { Link } from 'react-router-dom'


//Ícones
import Logo from "../img/logo.svg";
import { BsSearch } from 'react-icons/bs';

//Chakra
import { Center, Square, Circle, Box, InputLeftElement, Input, Divider, Text } from '@chakra-ui/react'
import { ChakraProvider, theme, input, InputGroup } from '@chakra-ui/react';



const Gerenciador = () => {

 return (
   
  <ChakraProvider theme={theme}>
     <Box bg={'#C3D5DD'}>
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
          
        </div>
    
           
           <Box padding={'10px'} w={'100%'} display={'flex'} h={'60px'} background={'#252525'}>
              <Text color={'white'} >Gerenciador De conteudo Reportado</Text>
              {/* CONECTAR COM O BACKEND PRA AS DENUNCIAS VIREM PRA CA */} 
              
              <InputGroup w={'75%'}  bg={'white'} justifyContent={'center'}>
                 <InputLeftElement>
                  <BsSearch></BsSearch>
                 </InputLeftElement>
                <Input type='text' placeholder='Pesquisar'></Input>
              </InputGroup>
            </Box>
          
      </section>
 
 
      
    
        <Footer/>  
     </Box>
    </ChakraProvider>
  
  );
}

export default Gerenciador;