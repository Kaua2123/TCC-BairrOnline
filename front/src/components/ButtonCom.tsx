import { Button, ButtonGroup, Stack, HStack, VStack } from '@chakra-ui/react'


const ButtonCom = () => {
    return(
<Stack direction='row' spacing={4}>
    <Button colorScheme='teal' size='xs' type="submit">
        Enviar
    </Button>
</Stack>
    ) 
}

export default ButtonCom;