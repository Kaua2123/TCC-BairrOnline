import { Flex, Box, Link as ChakraLink, List, ListItem, Icon, Button, VStack} from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineReport } from 'react-icons/md';
import {TbMessageReport} from 'react-icons/tb';

export const Navigation = ({menuClicado}) => {

    const links = [
        {label: 'Home', href: '/', icon: <AiOutlineHome/>},
        {label: 'Gestão de denúncias', href: '/', icon: <TbMessageReport/>},
        {label: 'Conteúdo reportado', href: '/', icon: <MdOutlineReport/>}
    
    ];

    return(
        <Flex>
            <List>
                {links.map((link, index) => (
                    <ListItem key={index}>
                        <ChakraLink href={link.href}>
                            <Flex p={2} align='flex-start'>
                                <VStack spacing={2}>
                                    <Button  bg='white' w='full' _hover={{color: '#338bb0'}}>
                                    <Icon fontSize={24} _hover={{color: '#338bb0'}}> {link.icon}</Icon> {link.label}
                                    </Button>
                                </VStack>
                            </Flex>
                        </ChakraLink>
                    </ListItem>
                ))}
            </List>
            </Flex>
    )
}

