import { Card, CardBody, Image, Text, CardFooter } from "@chakra-ui/react"

import inst from '../img/inst.png'


const CardInst = () => {
    return(
        <Card   maxW='sm' w='250px' bgColor='gray.100' align='center' border='1px solid gray' boxShadow='lg' _hover={{boxShadow: 'dark-lg', cursor: 'pointer', transition: '0.1s'}}>
        <CardBody>
          <Image src={inst}></Image>
        </CardBody>

        <CardFooter>
          <Text align='center' fontFamily='BreeSerif-Regular'> @xxxx</Text>
        </CardFooter>
     </Card>
    )
    
}




export default CardInst;