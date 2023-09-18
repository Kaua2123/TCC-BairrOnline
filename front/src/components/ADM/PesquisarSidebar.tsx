import {Box, Flex, Icon, IconButton, Text} from '@chakra-ui/react';
import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai';

export const PesquisarSidebar = () => {
    return(
    <Flex w='full' alignItems='center' justifyContent='space-between' flexDirection='row' gap={4}>
        <Box display='flex' alignItems='center' gap={2}>
            <Icon as={AiFillThunderbolt} fontSize={30}></Icon>
            <Text fontWeight='bold' fontSize={16}>
                BairrOnline
            </Text>
        </Box>
        <IconButton aria-label='pesquisa' variant='ghost' 
        icon={<AiOutlineSearch/>} fontSize={26} color='gray.400' borderRadius='50%'></IconButton>
    </Flex>
    )
}