//menu lateral pro adm (dashboard)

import { Box, ChakraProvider, HStack, Text, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { PesquisarSidebar } from "./PesquisarSidebar";


export const Sidebar = () => {
    return(
    <React.Fragment>
        <Box w='full'>
        <PesquisarSidebar/>
        </Box>
    </React.Fragment>
    )
}

