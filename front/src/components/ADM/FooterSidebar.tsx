import {Box, Flex, Icon, IconButton, Link, Text, Image, Input, Button, List, ListItem, VStack, Divider} from '@chakra-ui/react';

import {MdOutlineCommentsDisabled} from 'react-icons/md';
import {FiUserX} from 'react-icons/fi';

const links = [
    {label: 'Comentários reportados', href: '/', icon: <MdOutlineCommentsDisabled/>},
    {label: 'Usuários reportados', href: '/', icon: <FiUserX/>}

];

export const FooterSidebar = () => {
    return (
        
      <>
      <Divider/>
      <Flex alignItems="center">
            <Text align='center' color="#338bb0" fontFamily="BreeSerif-Regular" fontSize={16}>
                Gerenciamento de reportações
            </Text>
        </Flex><Flex>
                <List>
                    {links.map((link, index) => (
                        <ListItem key={index}>
                            <Link href={link.href}>
                                <Flex p={2} align='flex-start'>
                                    <VStack spacing={2}>
                                        <Button bg='white' w='full' _hover={{ color: '#338bb0' }}>
                                            <Icon fontSize={24} _hover={{ color: '#338bb0' }}> {link.icon}</Icon> {link.label}
                                        </Button>
                                    </VStack>
                                </Flex>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Flex>
        </>
 
    )
}

export default FooterSidebar;