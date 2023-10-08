import { ChakraProvider, Text, Wrap, WrapItem, Flex, ScaleFade, useDisclosure } from "@chakra-ui/react"
import { CardsReportadas } from "./CardsReportadas"
import axios from "axios"
import { useEffect, useState } from "react"



export const GestaoDenuncias = ({secaoAtiva, menuClicado}) => {

    const [denReportadas, setDenReportadas] = useState([]);

    const denunciasReportadas = () => {

        axios.get('http://localhost:3344/denunciasReportadas')
        .then((response) => {
            setDenReportadas(response.data);
        })
        .catch((error) => {
            console.log('erro ao retornar as denuncias reportadas.')
        })
    }

    useEffect(() => {
        denunciasReportadas();
    }, [])

    return(
        <ChakraProvider>


   <ScaleFade initialScale={0.4} in={secaoAtiva === 'gestaoDenuncias'}>
  <Wrap opacity={1} spacing={menuClicado ? '12' : '8'}  maxW={1000}>
   
        {denReportadas.map((reportar, index) => (
            <CardsReportadas reportar={reportar}/>
        ))}

       {/* <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/> */}
       
    </Wrap>
    </ScaleFade>
        </ChakraProvider>
    )
 
}