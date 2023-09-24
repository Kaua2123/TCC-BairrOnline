import { HStack,Image, Box, Text, Checkbox,Hide, Heading, ChakraProvider} from "@chakra-ui/react"
import imden from './../img/buraco.jpg'
import '../App.css';

import {useState, useEffect} from 'react';
import axios from "axios";

export const NotificacaoDen = ({notificacao}) => {

   

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
                    
                    <Heading color='#338bb0' fontSize='1xl'> {notificacao.not_titulo} em {notificacao.not_data} </Heading> {/*Titulo entra aqui*/}

                </Box>
            </HStack>           
        </Box>  
        </ChakraProvider>
    )
}

