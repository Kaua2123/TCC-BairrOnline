import { HStack,Image, Box, Text, Icon, Checkbox,Hide, Heading, ChakraProvider} from "@chakra-ui/react"
import imden from './../img/buraco.jpg'
import '../App.css';

import {useState, useEffect} from 'react';
import axios from "axios";

import { FiTrash } from "react-icons/fi";
import { MdBusiness } from 'react-icons/md';
import { AiOutlineCalendar, AiOutlineMessage } from 'react-icons/ai';

export const NotificacaoDen = ({notificacao}) => {

const dataFormatada = new Date(notificacao.not_data).toLocaleDateString("pt-BR");

    return(
        //(EXEMPLO) ISSO TEM QUE TAR VAZIO PQ BACKEND

    <ChakraProvider>
        <Box w='450px'border={'#F5F5F5 solid '}height={'200px'}  _hover={{bgColor:'#f5f5f5', cursor:'pointer'}} padding={'10px'} >

         <Text fontSize={'12pt'} color={'blackAlpha.700'} fontFamily='BreeSerif-Regular'></Text>
            <HStack>

                <label htmlFor="CheckNot">
                 <Box className="Boxnot" w="150px" h={'100px'} maxH={'120px'} maxW={'200px'}>
                  <Image src={imden} height={'inherit'} width={'inherit'}/>
                 </Box>
                </label>



                <Box display={"flex"} flexDirection={'column'} w={'55%'} h={'100px'} paddingLeft={'5px'} paddingRight={'5px'} >
                    {/*padding é melhor quando usado no elemento que ele precisa, tipo o box que vai conter os valores, usando no container principal ficou fei*/}

                    <Heading color='#338bb0' fontSize='1xl'> Denúncia assumida! </Heading> {/*Titulo entra aqui*/}
                    <HStack>
                    <Icon as={MdBusiness}/>
                    <Text>   {notificacao.inst_nome}</Text>
                    <Icon as={AiOutlineCalendar}/>
                    <Text> {dataFormatada}</Text>
                    <Icon as={AiOutlineMessage}/>
                    <Text>{notificacao.not_mensagem}</Text>
                    </HStack>
                    
                  <Icon as={FiTrash} mr={2} _hover={{color: '#338bb0'}} />
                </Box>
            </HStack>
        </Box>
        </ChakraProvider>
    )
}
