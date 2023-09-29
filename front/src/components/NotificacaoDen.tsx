import { HStack, Image, Box, Text, Flex, IconButton, MenuItem, MenuList, Icon, Checkbox, Hide, Heading, ChakraProvider, Card, VStack, Menu, MenuButton, useToast } from "@chakra-ui/react"

import '../App.css';

import { useState, useEffect } from 'react';
import axios from "axios";

import { FiTrash } from "react-icons/fi";
import { MdBusiness } from 'react-icons/md';
import { AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai';


import semImgDen from '../img/semImgDen.png';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiDotsVertical } from "react-icons/bi";


export const NotificacaoDen = ({ notificacao, notCod }) => {

  const [instituicoes, setInstituicoes] = useState([]);
  const dataFormatada = new Date(notificacao.not_data).toLocaleDateString("pt-BR");
  const toast = useToast();


  const deleteNotificacoes = (notCod) => {

    axios.delete(`http://localhost:3344/deleteNotificacoes/${notCod}`)
      .then((response) => {
        console.log("notificação deletada.")
        toast({
          title: 'Notificação deletada',
          duration: 2000,
          isClosable: true,
          status: 'success'
        })
      })
      .catch((error) => {
        console.log("erro ao deletar notificação")
        toast({
          title: 'Erro ao deletar notificação',
          duration: 2000,
          isClosable: true,
          status: 'error'
        })
      })
  }

  async function getInstituicoes() {
    axios.get('http://localhost:3344/getInstituicoes')
      .then(response => {
        setInstituicoes(response.data);

      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    getInstituicoes();
  }, [])


  return (
    //(EXEMPLO) ISSO TEM QUE TAR VAZIO PQ BACKEND

    <ChakraProvider>
      <Card ml={5} mt={3} w='425px' h='250px' boxShadow='lg'>
        <HStack justify='space-between'>

          <Text color='#338bb0' fontSize='25px' fontFamily='BreeSerif-Regular' ml={2}> Denúncia assumida! </Text>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<BiDotsVertical />}

              color='#338bb0'
              variant='outline'
              _hover={{ color: 'white', backgroundColor: '#338bb0' }}
            />
            <MenuList>
              <MenuItem onClick={() => {
                deleteNotificacoes(notCod);
              }}>
                Apagar
              </MenuItem>
              <MenuItem >
                Marcar como lida
              </MenuItem>
            </MenuList>
          </Menu>

        </HStack>

        <HStack gap={1} w='full'>

          {notificacao.den_img ? (
            <Image src={`http://localhost:3344/retornaImagem/${notificacao.den_img}`} boxSize='140px' />
          ) : (
            <Image src={semImgDen} boxSize='140px'></Image>
          )}

          {/*Titulo entra aqui*/}

          <VStack align='start' spacing={0}>

            {instituicoes
              .filter((instituicao) => instituicao.usu_cod === notificacao.usuario_usu_cod)
              .map((instituicao) => (
                <HStack spacing={1} align='center' key={instituicao.usu_cod}>
                  <Icon fontSize='20px' as={MdBusiness} />
                  <Text isTruncated> Instituição: {instituicao.usu_nome}  </Text>
                </HStack>
              ))}


            <HStack spacing={1} align='center'>
              <Icon fontSize='20px' as={AiOutlineCalendar} />
              <Text>Data: {dataFormatada}</Text>
            </HStack>

            <HStack spacing={1} align='flex-end'>
              <Icon fontSize='20px' as={HiOutlineClipboardDocumentList} />
              <Text>Denúncia: {notificacao.den_nome}</Text>
            </HStack>
          </VStack>


        </HStack>
        <Text ml={5} pb='10px'>
          Verifique o status de sua denúncia no acompanhar denúncias.
        </Text>


      </Card>
    </ChakraProvider>
  )
}
