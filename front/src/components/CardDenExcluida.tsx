//chakra
import { Box, Card, CardBody, CardHeader, Flex, Icon, Heading, Stack, Text, Image, CardFooter } from "@chakra-ui/react";


//imgs
import semImgDen from '../img/semImgDen.png';

//icones
import { FaTrash } from "react-icons/fa";


const CardDenExcluida = ({ nome, descricao, bairro, imagem, dataExclusao }) => {

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
                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {dataFormatada}</Heading>
                        <Text fontFamily='BreeSerif-Regular' fontSize={{ base: 'xs', md: 'xs' }} fontWeight='thin'>
                            {descricao}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter>

           
                <Text fontSize='18px' color='#338bb0'>
                <Icon as={FaTrash} mr={2} /> 
                    Excluída
                </Text>
    
                </CardFooter>

            </Card>
   
    )

}

export default CardDenExcluida;