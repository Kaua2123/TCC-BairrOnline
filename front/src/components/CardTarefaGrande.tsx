import { Card, CardBody,Text, CardFooter, CardHeader, Box, Button, IconButton, HStack, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";


const CardTarefaGrande = ({nome, acoNum}) => {
    const [acompanhamentos, setAcompanhamentos] = useState([]);
    const [subtarefas, setSubtarefas] = useState([]);
    const [subCod, setSubCod] = useState([]);
    const toast = useToast();


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

      const concluirSubtarefa = (sub_cod) => {
        axios.put(`http://localhost:3344/concluirSubtarefa/${sub_cod}`)
          .then((response) => {
            toast({
              title: 'Concluída',
              duration: 2000,
              status: 'success',
              isClosable: true
            })
          })
          .catch((error) => {
            console.log('Erro ao concluir subtarefa.', error);
            toast({
              title: 'Erro ao concluir subtarefa.',
              duration: 2000,
              status: 'error',
              isClosable: true
            })
          });
      };
    
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
            <Box key={subtarefa.sub_cod}>
                <HStack>
              <Text mb={2}>{subtarefa.sub_texto}</Text>
              {subtarefa.sub_estado === 'andamento' && (
                <IconButton
                  onClick={() => {
                    concluirSubtarefa(subtarefa.sub_cod)
                  }}
                  aria-label="Marcar como concluída"
                  icon={<CheckIcon />}
                  ml='auto'     
                  variant='outline'
                  borderRadius='100%'
                  mb={2}
                  _hover={{ background: 'white', color: '#338bb0', transform: 'scale(1.1)',  transition: 'transform 0.3s ease'}}
                />
              )}
              {subtarefa.sub_estado === 'concluida' && (
                <CheckIcon ml='auto' color='green.300'/>
              )}
              </HStack>
            </Box>
          ))}
        </Box>
            </CardBody>
        </Card>
    )
   
}


export default CardTarefaGrande;
