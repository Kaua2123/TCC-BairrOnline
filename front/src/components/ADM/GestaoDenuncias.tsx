import { ChakraProvider, Text } from "@chakra-ui/react"
import { CardsReportadas } from "./CardsReportadas"



export const GestaoDenuncias = () => {
    return(
        <ChakraProvider>
        <CardsReportadas/>
        </ChakraProvider>
    )
 
}