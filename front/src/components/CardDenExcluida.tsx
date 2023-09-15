//chakra
import { Box, Card, CardBody, CardHeader, Flex, Icon, Heading, Stack, Text, Image, CardFooter } from "@chakra-ui/react";


//imgs
import semImgDen from '../img/semImgDen.png';

//icones
import { FaTrash } from "react-icons/fa";


const CardDenExcluida = ({ denunciaExcluida }) => {

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
    return (
 
            <Card boxShadow='lg'>
                <CardBody>
                    {denunciaExcluida.den_img ? (
                        <Image src={`http://localhost:3344/retornaImagem/${denunciaExcluida.den_img}`} borderRadius='lg' boxSize='200px' />
                    ) : (
                        <Image src={semImgDen} boxSize={{ base: '90px', md: '140px', lg: '200px' }} align='center'></Image>
                    )}
                    <Stack mt='6' spacing='3'>
                        <Heading size={{ base: 'xs', md: 'xs', lg: 'md' }} fontFamily='BreeSerif-Regular' fontWeight='normal'>{denunciaExcluida.den_nome}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>em {denunciaExcluida.den_bairro}</Heading>
                        <Heading size='xs' textTransform='uppercase' color='gray'>Data de envio: {denunciaExcluida.den_data}</Heading>
                        <Text fontFamily='BreeSerif-Regular' fontSize={{ base: 'xs', md: 'xs' }} fontWeight='thin'>
                            {denunciaExcluida.den_desc}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter>

                <Flex alignItems='flex-end'>
                <Text fontSize='18px' color='#338bb0'>
                <Icon as={FaTrash} mr={2} /> 
                    Excluída
                </Text>
                </Flex>
                </CardFooter>

            </Card>
   
    )

}

export default CardDenExcluida;