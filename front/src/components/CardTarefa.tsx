import { Box, IconButton } from "@chakra-ui/react"
import { PiPlusBold } from "react-icons/pi";



const CardTarefa = () => {
    return(
        
 
     <Box bg='#338BB0' fontSize='20px' w='80%' p={3} color='white'>
        El agua estas estancada
     <IconButton aria-label="kkkk" bgColor="#338BB0" color="white" _hover={{}} icon={<PiPlusBold/>}></IconButton> 
    </Box>

    )
}




export default CardTarefa;