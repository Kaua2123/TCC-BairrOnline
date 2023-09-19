import { ChakraProvider, Text, Wrap, WrapItem, Flex, ScaleFade, useDisclosure } from "@chakra-ui/react"
import { CardsReportadas } from "./CardsReportadas"



export const GestaoDenuncias = ({secaoAtiva, menuClicado}) => {

    return(
        <ChakraProvider>


   <ScaleFade initialScale={0.4} in={secaoAtiva === 'gestaoDenuncias'}>
  <Wrap opacity={1} spacing={menuClicado ? '12' : '8'}  maxW={1000}>
   
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       <CardsReportadas/>
       
    </Wrap>
    </ScaleFade>
        </ChakraProvider>
    )
 
}