//chakra
import { Box, Card, CardBody, CardHeader, Flex, Icon, Heading, Stack, Text, Image, CardFooter, useToast, Button } from "@chakra-ui/react";

//axios
import axios from "axios";

//imgs
import semImgDen from '../img/semImgDen.png';

//icones
import { FaTrash } from "react-icons/fa";


const CardDenExcluida = ({ nome, descricao, bairro, imagem, dataExclusao, denCod }) => {

    const caracteresMaxDescricao = 24;
    const caracteresMaxTitulo = 20;

    const cortaTextoDescricao = (text) => {
        if (text.length > caracteresMaxDescricao) {
            return text.slice(0, caracteresMaxDescricao) + '...';
        }
        return text;
    }

    const cortaTextoTitulo = (text) => {
        if (text.length > caracteresMaxTitulo) {
            return text.slice(0, caracteresMaxTitulo) + '...';
        }
        return text;
    }

    const dataFormatada = new Date(dataExclusao).toLocaleDateString("pt-BR");
    const toast = useToast();

    async function reverterDenunciaExcluida() {

        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    
        const codTeste = 23
        await axios.post(`http://localhost:3344/reverterDenunciaExcluida/${denCod}`)
          .then(response => {
            if (response) {
              toast({
                title: 'Sucesso',
                description: 'Sua denúncia foi revertida.',
                status: 'success',
                duration: 4000,
                isClosable: true
              });
    
              setTimeout(() => { // esperar um tempo e recarregar a pagina
                window.location.reload();
              }, 1000);
            }
          })
          .catch(error => {
            if (error) {
              toast({
                title: 'Erro',
                description: 'Houve um erro ao reverter a denúncia excluída.',
                status: 'error',
                duration: 4000,
                isClosable: true
              });
    
            }
          })
      }
    

    return (
 
            <Card boxShadow='lg' border='1px solid gray' maxW='sm' w={{ base: '280px', md: '265px' }} maxH='lg' h={{ base: '23em', md: '23em', lg: '29em' }} >
                <CardBody>
                    {imagem ? (
                        <Image src={`http://localhost:3344/retornaImagem/${imagem}`} borderRadius='lg' boxSize='200px' />
                    ) : (
                        <Image src={semImgDen} boxSize={{ base: '90px', md: '140px', lg: '200px' }} align='center'></Image>
                    )}
                    <Stack mt='6' spacing='3'>
                        <Heading size={{ base: 'xs', md: 'xs', lg: 'md' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>{nome}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em {bairro}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de exclusão: {dataFormatada}</Heading>
                        <Text fontFamily='BreeSerif-Regular' fontSize={{ base: 'xs', md: 'xs' }} fontWeight='thin'>
                            {descricao}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter>

           
               
                <Button variant='solid' bgColor='#338bb0' color='white' _hover={{ color: '#338bb0', backgroundColor: 'white' }} onClick={reverterDenunciaExcluida}>
                          Reverter
                </Button>

                <Text fontSize='18px' color='#338bb0' ml={28} mt={3}>
                <Icon as={FaTrash} /> 
                </Text>
    
                </CardFooter>

            </Card>
   
    )

}

export default CardDenExcluida;