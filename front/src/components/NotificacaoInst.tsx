import { HStack,Image, Box, Text, Checkbox,Hide, ChakraProvider} from "@chakra-ui/react"
import imden from './../img/buraco.jpg'
import '../App.css';

import {useState, useEffect} from 'react';
import axios from "axios";

export const NotificacaoInst = () => {

   

    return(
        //(EXEMPLO) ISSO TEM QUE TAR VAZIO PQ BACKEND

    <ChakraProvider>
        <Box w='450px'border={'#F5F5F5 solid '}height={'200px'}  _hover={{bgColor:'#f5f5f5', cursor:'pointer'}} padding={'10px'} >

         <Text fontSize={'12pt'} color={'blackAlpha.700'} fontFamily='BreeSerif-Regular'></Text>
            <HStack>
           
  
                <Box display={"flex"} flexDirection={'column'} w={'55%'} h={'100px'} paddingLeft={'5px'} paddingRight={'5px'} >
                    {/*padding é melhor quando usado no elemento que ele precisa, tipo o box que vai conter os valores, usando no container principal ficou fei*/}
                    
                <Text>Um usuário lhe mencionou</Text>

                </Box>
            </HStack>           
        </Box>  
        </ChakraProvider>
    )
}

