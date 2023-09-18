import React from 'react';
import {
  Box,
  Center,
  Circle,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

import {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

const Gerenciador = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodificaToken: any = jwtDecode(token);

    if(decodificaToken.usu_tipo !== 'administrador'){
      navigate('/');
    }
  }, [])


  return (
    <Box bg="#C3D5DD">
      <section id="Gerenciador">
        <aside id="menulateral">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Denúncias Reportadas
          </Text>
          <Box>
            <Text>Filtrar por</Text>
            <Select>
              <option value="tipo1">Descrição falsa</option>
              <option value="tipo2">Descrição Ofensiva</option>
              <option value="tipo3">Imagem Imprópria</option>
              <option value="tipo4">Informação pessoal demais</option>
              <option value="tipo5">Denúncia repetida</option>
            </Select>
          </Box>
          <Box mt={4}>
            <button>Filtrar</button>
            <button>Limpar</button>
          </Box>
          <Text fontSize="xl" fontWeight="bold" mt={8}>
            Comentários
          </Text>
        </aside>

        <Box padding={4} w="100%" display="flex" h={16} background="#252525">
          <Text color="white">Gerenciador De Conteúdo Reportado</Text>
          <InputGroup w="75%" bg="white" justifyContent="center">
            <InputLeftElement>
              <BsSearch />
            </InputLeftElement>
            <Input type="text" placeholder="Pesquisar" />
          </InputGroup>
        </Box>
      </section>

      <Footer />
    </Box>
  );
};

export default Gerenciador;