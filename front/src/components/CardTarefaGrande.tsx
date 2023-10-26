import { Card, CardBody,Text, CardFooter, CardHeader, Box, Button } from "@chakra-ui/react";
import { useState } from "react";


const CardTarefaGrande = ({nome}) => {
    const [acompanhamentos, setAcompanhamentos] = useState([]);
  
  

    return (
        <Card bg='#338BB0' color='white' h='40vh' w='20vw'>
            <CardHeader>
                <Box bgColor='white' borderRadius='4px' p={2}> 
                    <Text color='#338bb0' justifyContent='center'>
                        {nome}
                    </Text>
                </Box>
            </CardHeader>
            <CardBody>
                <Box>
                    <Text> Subtarefas 1</Text>
                    <Text> Subtarefas 2</Text>
                    <Text> Subtarefas 3</Text>

                </Box>
            </CardBody>

            <CardFooter>    
            <Box>
              <Button color='green' bgColor='white'>Concluir</Button>
            </Box>
            </CardFooter>
        </Card>
    )
   
}


export default CardTarefaGrande;
