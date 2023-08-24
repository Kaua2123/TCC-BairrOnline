import { Button, ButtonGroup, Stack, HStack, VStack } from '@chakra-ui/react'


const ButtonCom = () => {
    return(
<Stack direction='row' spacing={4}>
    <Button isLoading colorScheme='teal' variant='solid'>
        Email
    </Button>
</Stack>
    ) 
}

export default ButtonCom;