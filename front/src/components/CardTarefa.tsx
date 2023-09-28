import {
  Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Button, Text, Input, Textarea, Flex, Stack, Step, StepDescription, StepIcon, StepIndicator, StepSeparator,
  StepStatus, StepTitle, Stepper, useSteps, useToast,
}
  from "@chakra-ui/react"
import { TfiPlus } from "react-icons/tfi";

import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const steps = [
  { title: '20%', description: 'Saneamento básico.' },
  { title: '50%', description: 'kkkkk' },
  { title: '100%', description: 'Solucionado' },
]



const CardTarefa = ({acompanhamento}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [denNome, setDenNome] = useState("");
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })
  const [subtarefas, setSubtarefas] = useState([]);
  const [novaSubtarefa, setNovasubtarefa] = useState("");

  const [subtarefaTexto, setSubtarefaTexto] = useState("");
  const [subtarefaPrioridade, setSubtarefaPrioridade] = useState("media");
  const [subtarefaEstado, setSubtarefaEstado] = useState("andamento");
  const toast = useToast();

  const criarSubtarefa = async () => {

    const token = localStorage.getItem('token')
    if (!token) {
      console.log('não autenticado')
      return;
    }

    const decodificaToken: any = jwt_decode(token);


      await axios.post('http://localhost:3344/criarSubtarefa', {
          sub_data_inicio: new Date(),
          sub_data_conclusao: new Date(),
          sub_texto: subtarefaTexto,
          sub_prioridade: subtarefaPrioridade,
          sub_estado: subtarefaEstado,
          acompanhamento_aco_num: acompanhamento.aco_num,
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

  

  return (

    <Box bg='#338BB0' fontSize='20px' borderRadius='10px' w='80%' p={3} color='white'>
      {acompanhamento.den_nome}
      <Button onClick={onOpen} w='100px' h='30px' ml='130px' leftIcon={<TfiPlus />} _hover={{ backgroundColor: 'acqua', color: '#338bb0' }}
        color='black ' position="absolute" right="130px">Abrir</Button>
      <Modal size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column">
              <Text fontSize='28px' ml='300px' mt='-10px' color='#338BB0'><b>Resolução da denúncia</b></Text>
              
              <Stepper size='lg' index={activeStep}>
                {steps.map((step, index) => (
                  <Step key={index} onClick={() => setActiveStep(index)}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}

                      />
                    </StepIndicator>

                    <Box flexShrink='0'>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
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
                    {/* <Box mt="20px" maxH="5px"> 
                       <Stack >
                      {subtarefas.map((subtarefa, index) => (
                     <div key={index}>
                     <p style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>{subtarefa}</p>
                   </div>
                 ))}
                        </Stack>
                      </Box> */}
                    <Box ml="600px" mt="-130px">
                      <Text fontSize="20px">
                        <b>Mensagem para o denunciante</b>
                      </Text>
                      <Textarea borderColor="gray" />
                      <Button bgColor="#338BB0" color="white" _hover={{ backgroundColor: "white", color: "#338BB0" }}
                      w="90px" h="45px " mt='10px'ml='300px'>
                        Enviar
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </Box>
  )
}



export default CardTarefa;