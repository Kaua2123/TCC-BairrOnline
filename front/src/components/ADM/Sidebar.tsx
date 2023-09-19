//menu lateral pro adm (dashboard)

import { Box, ChakraProvider, HStack, Text, Flex, IconButton, Divider } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { PesquisarSidebar } from "./PesquisarSidebar";
import { Navigation } from "./Navigation";


export const Sidebar = () => {
    return(
    <React.Fragment>
        <Box w='full'>
        <PesquisarSidebar/>
        <Divider/>
        <Navigation/>
        </Box>
    </React.Fragment>
    )
}

