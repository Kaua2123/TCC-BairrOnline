import { Card, CardBody,Text, CardFooter, CardHeader, Box, Button, IconButton, HStack, useToast, useDisclosure, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";
import jwtDecode from "jwt-decode";

const CardTarefaGrande = ({nome, acoNum}) => {
    const [acompanhamentos, setAcompanhamentos] = useState([]);
    const [subtarefas, setSubtarefas] = useState([]);
    const [subCod, setSubCod] = useState([]);
    const [subtarefaTexto, setSubtarefaTexto] = useState("");
    const [subtarefaPrioridade, setSubtarefaPrioridade] = useState("media");
    const [subtarefaEstado, setSubtarefaEstado] = useState("andamento");
    const toast = useToast();

    const {onOpen, isOpen, onClose} = useDisclosure();


    const criarSubtarefa = async () => { //para criação de subtarefas kkkkkkk tmn3cc39109129119

      const token = localStorage.getItem('token')
      if (!token) {
        console.log('não autenticado')
        return;
      }
  
      if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
      }
  
      const decodificaToken: any = jwtDecode(token);
  
        await axios.post('http://localhost:3344/criarSubtarefa', {
            sub_data_inicio: new Date(),
            sub_data_conclusao: new Date(),
            sub_texto: subtarefaTexto,
            sub_prioridade: subtarefaPrioridade,
            sub_estado: subtarefaEstado,
            acompanhamento_aco_num: acoNum,
            usuario_usu_cod: decodificaToken.usu_cod
        })
        .then((response) => {
          toast({
            title: 'Subtarefa criada.',
            duration: 3000,
            status: 'success',
            isClosable: true
          })
        })
        .catch((error) => {
          toast({
            title: 'erro ao criar subtarefa.',
            duration: 3000,
            status: 'error',
            isClosable: true
          })
        })
    }

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
      
      const concluirAcompanhamento = () => {
        // Verificar se todas as subtarefas foram concluídas
        const todasConcluidas = subtarefas.every(subtarefa => subtarefa.sub_estado === 'concluida');
      
        if (todasConcluidas) {
          // Todas as subtarefas estão concluídas, então pode concluir o acompanhamento
          axios.put(`http://localhost:3344/concluirAcompanhamento/${acoNum}`)
            .then((response) => {
              toast({
                title: 'Concluída',
                description: 'Essa denúncia foi solucionada e será exibida para os usuários.',
                duration: 2000,
                status: 'success',
                isClosable: true
              })
            })
            .catch((error) => {
              toast({
                title: 'Erro ao concluir',
                duration: 2000,
                status: 'error',
                isClosable: true
              })
            });
        } else {
          // Exibir uma mensagem informando que todas as subtarefas precisam ser concluídas primeiro
          toast({
            title: 'Subtarefas Pendentes',
            description: 'Conclua todas as subtarefas antes de marcar o acompanhamento como concluído.',
            duration: 2000,
            status: 'warning',
            isClosable: true
          });
        }
      }
      
      
    
    return (
        <Card bg='#338BB0' color='white' h='45vh' w='20vw'>
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
              <Text mb={0}>{subtarefa.sub_texto}</Text>
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

            <CardFooter>
              <Button onClick={onOpen}>Mais detalhes</Button>
            </CardFooter>
            <Modal size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <Text fontSize='28px' ml='300px' mt='-10px' color='#338BB0'><b>Adição de subtarefas</b></Text>
              
              <Flex justifyContent="space-between" mt="20px">
                <Flex flexDirection="row">
                  <Box>
                    <Box mt="100px">
                      <Text fontSize="20px">
                        <b>Adicionar subtarefa</b>
                      </Text>
                      <Input type="text" w='150px' borderColor="gray" mt='10px' value={subtarefaTexto}
                       onChange={(e) => setSubtarefaTexto(e.target.value)}/>
                      <Stack></Stack>
                      <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }}
                        mt='-67px' ml='160px' onClick={criarSubtarefa}>
                        Adicionar
                      </Button>
                    </Box>
                    <Box mt="20px" maxH="5px"> 
                       <Stack >
                       <ul className="subtarefas-list">
                        {subtarefas.map((subtarefa, index) => (
                          <li key={index}>Subtarefa {index + 1}: {subtarefa.sub_texto}</li>
                        ))}
                      </ul>
                        </Stack>
                      </Box>
                    
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={concluirAcompanhamento}>Concluir acompanhamento</Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
        </Card>
        
    )
   
}


export default CardTarefaGrande;
