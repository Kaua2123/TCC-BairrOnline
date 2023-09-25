import { HStack,Image, Box, Text, Icon, Checkbox,Hide, Heading, ChakraProvider, Card, VStack} from "@chakra-ui/react"
import imden from './../img/buraco.jpg'
import '../App.css';

import {useState, useEffect} from 'react';
import axios from "axios";

import { FiTrash } from "react-icons/fi";
import { MdBusiness } from 'react-icons/md';
import { AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai';

import semImgDen from '../img/semImgDen.png';


export const NotificacaoDen = ({notificacao}) => {

const dataFormatada = new Date(notificacao.not_data).toLocaleDateString("pt-BR");

    return(
        //(EXEMPLO) ISSO TEM QUE TAR VAZIO PQ BACKEND

    <ChakraProvider>
         <Card ml={5} mt={3} w='425px' boxShadow='lg'> 
         <Heading color='#338bb0' fontSize='1xl'> Denúncia assumida! </Heading> 
            <HStack gap={5}>

                 {notificacao.den_img ? (
                        <Image src={`http://localhost:3344/retornaImagem/${notificacao.den_img}`} boxSize='140px'/>
                    ) : (
                        <Image src={semImgDen} boxSize='140px'></Image>
                    )}
        
                   {/*Titulo entra aqui*/}
                    
                <VStack align='center'>
                    <Icon as={MdBusiness}/>
                    <Text>   {notificacao.inst_nome}</Text>
                </VStack>
                
                <VStack>
                    <Icon as={AiOutlineCalendar}/>
                    <Text> {dataFormatada}</Text>
                </VStack>

                    <VStack>
                    <Icon as={AiOutlineMessage}/>
                    <Text>{notificacao.not_mensagem}</Text>
                    </VStack>
            </HStack>

            <Icon as={FiTrash} mr={2} cursor='pointer' _hover={{color: '#338bb0'}} />
            </Card>
        </ChakraProvider>
    )
}
