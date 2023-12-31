import { Flex, Box, Text, Card, CardBody, CardFooter, CardHeader, Link as ChakraLink, List, ListItem, Icon, Button, VStack, ChakraProvider, Heading} from '@chakra-ui/react';



export const CardsReportadas = ({reportar}) => {

    const dataFormatada = new Date(reportar.rep_data).toLocaleDateString("pt-BR");

    return(
    <ChakraProvider>
        <Card  boxShadow='lg'  w='20vw' h='auto' bg='gray.200' borderRadius='3xl'>
            <Heading>
                <Text fontSize='15px' m={4}>Denúncia: {reportar.den_nome}</Text>
            </Heading>
        
        <CardBody>
            <Box>
                <Text>Reportada em: {dataFormatada}</Text>
                <Text>Reportada por: {reportar.rep_motivo}</Text>
                <Text>Usuário denunciante: {reportar.usu_nome}</Text>
            </Box>
        </CardBody>

            <CardFooter justifyContent='flex-end'>
                    <Flex> 
                        <Button variant='ghost' color='red'>Deletar</Button>
                        <Text>{reportar.rep_status}</Text>
                    </Flex>
 
            </CardFooter>
        </Card>
    </ChakraProvider>
    )
   
}


