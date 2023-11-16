import { Card, CardBody,Text, CardFooter, CardHeader, Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import axios from "axios";


const CardTarefaGrande = ({nome, acoNum}) => {
    const [acompanhamentos, setAcompanhamentos] = useState([]);
    const [subtarefas, setSubtarefas] = useState([]);
  
    const getSubtarefa = () => { //para exibição das subtarefas

        const token = localStorage.getItem('token') //pegando token do usuario logado para exibir somente as subtarefas dele
        if (!token) {
          console.log('não autenticado')
          return;
        }
    
        if (token) {
          axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    
        axios.get(`http://localhost:3344/getSubtarefa/${acoNum}`)
        .then((response) => {
          setSubtarefas(response.data);
        })
        .catch((error) => {
          console.log('Erro ao buscar subtarefas.', error)
        })
      }
    
      useEffect(() => { //chamar a função de get assim que o componente/página for carregada
        getSubtarefa();
      }, [])

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
                <Text>Subtarefas:</Text>
          {subtarefas.map((subtarefa) => (
            <Text key={subtarefa.sub_cod}>{subtarefa.sub_texto}</Text>
          ))}
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
