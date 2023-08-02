
  import '../App.css';


  //img
  import Logo from "../img/logo.svg";
  import Camera from "../img/camera.png";
  import realizarDen from "../img/realizarDen.png";
  import enviandoDen from "../img/enviandoDen.png";


  //chakra
  import { ChakraProvider, extendTheme, Image, Flex, Box, Button, Wrap, WrapItem, Text, VStack, Center, FormControl,
  FormLabel, FormHelperText, FormErrorMessage, Spacer, Container, Input, InputLeftElement, InputGroup, Textarea} from '@chakra-ui/react';


  //componentes
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  //react
  import { useState } from "react";
  import { useRef } from "react";

  //react icons
  import { BsCardText, BsCamera, BsListUl} from "react-icons/bs"
  import { HiOutlineClipboardDocumentList } from "react-icons/hi2"


  const bairros = ['Aero Clube', 'Água Limpa', 'Açude', 'Aterrado', 'Belo Horizonte', 'Belmonte', 'Boa Sorte',
  'Brasilândia', 'Caieira', 'Casa de Pedra', 'Conforto', 'Coqueiros', 'Cruzeiro', 'Dom Bosco', 'Eucaliptal',
    'Jardim Amália', 'Jardim Belvedere', 'Jardim Cidade do Aço', 'Jardim Cordoeira', 'Jardim Europa', 'Jardim Normândia', 
    'Jardim Ponte Alta', 'Jardim Primavera', 'Jardim Vila Rica', 'Laranjal', 'Monte Castelo', 'Niterói', 'Nova Primavera',
    'Parque das Garças', 'Ponte Alta', 'Ponte Alta de Baixo', 'Retiro', 'Roma', 'Santa Cruz', 'Santa Inês',
      'Santa Rita do Zarur', 'Santo Agostinho', 'São Cristóvão', 'São Geraldo', 'São João', 'São Luiz', 'Sessenta', 
    'Siderópolis', 'Três Poços', 'Vila Americana', 'Vila Mury', 'Vila Rica', 'Vila Santa Cecília', 'Voldac'];


  const Denuncie = () => {

    const [imgPreview, setImgPreview] = useState("");  

    const fileInputRef = useRef(null);

  
    //pra upar a imagem com click no iconezinho da camera
    const handleImageUpload = () => {
      const fileInput = document.getElementById("file-input");
      if(fileInput){
        fileInput.click();
      }
    }

    //pra pegar a imagem enviada e mostrar
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgPreview(reader.result);
        }
        reader.readAsDataURL(file);
      }
    }

 
    const theme = extendTheme({
      styles: {
        global: () => ({
          body: {
            background: "",
          },
        }),
      },
    });


      return (
        <ChakraProvider theme={theme}>
            <Header/>
      <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
    <Flex align='center'>
   
      <Box bg='white'  borderRadius='4px' h='1800px' w='100%'>
                    
        <Flex justifyContent='space-between'>

          <Flex  flexDirection='column' >
              <Image src={realizarDen} boxSize='54em'></Image>
          </Flex>
            

          <Flex flexDirection='column' m='20px' mt='100px'  w='610px'>
          <Text color='#338BB0'   fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Realize sua denúncia</Text>
            <Text w='410px' mt='40px' fontSize='25px'>Seu lugar de denunciar é aqui. Esteja ciente de que suas denúncias poderão ser visualizadas por outros usuários e/ou instituições.</Text>
                 
                 
            <Text color='#338BB0' mt='30px'  fontSize='35px' fontFamily='BreeSerif-Regular' fontWeight='extrabold' >Acompanhamento </Text>
            <Text w='450px' mt='40px' fontSize='25px'>O apoio dos outros usuários às denúncias ajuda na visibilidade, fazendo com que instituições vejam e desejem assumir a solução das mesmas. Você pode acompanhar as soluções na página Acompanhar Denúncias</Text>     
          
          </Flex>
        

  
          </Flex>
          <Box h='50px' bg='#F2F2F2' boxShadow='lg'></Box>
        
          <Flex justifyContent='space-between'>

      
            <Flex flexDirection='column'>
                <FormControl p='100px'>
                  <FormLabel fontSize='28px' fontWeight='normal' >Protocolo da denúncia:</FormLabel>
                        
                  <FormLabel mt='30px' fontSize='28px' fontWeight='normal' >Título da denúncia:</FormLabel>
                            
                  <InputGroup>
                    <InputLeftElement>
                        <HiOutlineClipboardDocumentList size='25px'/>
                    </InputLeftElement>
                      <Input border='1px solid black' w='340px' _hover={{border: '1px solid #A9A9A9	'}} type='text'></Input>
                  </InputGroup>  

                    <FormLabel mt='30px' fontSize='28px' fontWeight='normal' >Digite o bairro a ser denunciado</FormLabel>

                      <InputGroup>
                        <InputLeftElement>
                            <BsListUl size='25px  '/>
                        </InputLeftElement>
                        <Input border='1px solid black' w='340px' _hover={{border: '1px solid #A9A9A9	'}} type='text'></Input>
                      </InputGroup>  

                    <FormLabel mt='30px' whiteSpace='nowrap'  fontSize='28px' fontWeight='normal' >Digite o que está lhe incomodando: </FormLabel>

                      <InputGroup>
                        <InputLeftElement>
                            <BsCardText size='25px'/>
                        </InputLeftElement>
                        <Textarea border='1px solid black' w='45ch' resize='vertical' maxLength={220} pl='2.5rem' _hover={{border: '1px solid #A9A9A9	'}}></Textarea>
                    </InputGroup>  

                    <FormLabel mt='30px' whiteSpace='nowrap'  fontSize='28px' fontWeight='normal' >Enviar imagem </FormLabel>
                    <InputGroup>
                        <InputLeftElement onClick={handleImageUpload} cursor='pointer' border='1px solid white' _hover={{color: 'blue.500', borderColor: 'black', transition: '0.1s', borderRadius: '60%'}}>
                            <BsCamera size='25px'/>
                        </InputLeftElement>
                              
                      <Input id='file-input' type='file' display='none' onChange={handleFileChange}></Input>

                    <Spacer/> 
                            
                      <Button type='submit'  bgColor='#338BB0' color='white' _hover={{color: '#338BB0', bgColor: '#DCDCDC'}}>Criar denúncia</Button>
                      
                    </InputGroup>  
                        
                    {/*essa linha de baixo que mostra as imagens dps de enviar */}
                    {imgPreview && <img src={imgPreview} alt="Imagem selecionada" style={{ marginTop: "40px", width: "300px", height: "150px" }} />}
                </FormControl>
    
            </Flex>
            <Flex direction='column'>
              <Image src={enviandoDen}></Image>
            </Flex>
          </Flex>
              
            </Box>

    </Flex>
  

          <Footer/>  
        </ChakraProvider>
      );
  };  

  export default Denuncie;