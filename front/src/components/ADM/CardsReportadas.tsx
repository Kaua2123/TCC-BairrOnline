import { Flex, Box, Text, Card, CardBody, CardFooter, CardHeader, Link as ChakraLink, List, ListItem, Icon, Button, VStack, ChakraProvider, Heading} from '@chakra-ui/react';



export const CardsReportadas = () => {
    return(
    <ChakraProvider>
        <Card boxShadow='lg'  w='300px' h='auto' bg='gray.200' borderRadius='3xl'>
            <Heading>
                <Text fontSize='15px' m={4}>@nomedenuncia</Text>
            </Heading>
        
        <CardBody>
            <Box>
                <Text>kk</Text>
            </Box>
        </CardBody>

            <CardFooter>
                <Flex justifyContent='flex-end' >
                    <Flex justify='flex-end'> 
                        <Button variant='ghost'>Deletar</Button>
                    </Flex>
                </Flex>
            </CardFooter>
        </Card>
    </ChakraProvider>
    )
   
}


