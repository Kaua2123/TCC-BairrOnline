import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button, Card , Box , HStack, Text, Tag, TagLabel, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

//Iconezin
import { AiFillDelete } from "react-icons/ai";


const CardCom = ({ denCod }) => {
  const [comentarios, setComentarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  async function getComentarios() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }

    try {
      const response = await axios.get(`http://localhost:3344/buscarComentario/${denCod}`);
      setComentarios(response.data);
      console.log('comentarios buscados: ', response.data);
    } catch (error) {
      console.error('Erro ao buscar comentarios', error);
    }
  }

  async function getUsuarios() {
    try {
      const response = await axios.get('http://localhost:3344/getUsuarios');
      setUsuarios(response.data);
      console.log('Deu bom amiguinho, informações:', response.data);
    } catch (error) {
      console.error('N deu bom amiguinho', error);
    }
  }

  useEffect(() => {
    getComentarios();
    getUsuarios();
  }, [denCod]);

  // Renderizar apenas quando ambos os arrays de comentários e usuários estiverem carregados
  if (comentarios.length === 0 || usuarios.length === 0) {
    return null; // Adcionar indicador de carregamento dps
  }

  return (
    <Box>
      {comentarios.map((comentario) => {
        const usuario = usuarios.find((user) => user.usu_cod === comentario.usuario_usu_cod);

        if (!usuario) {
          return null; // Adicionar algum comportamento de erro(Talvez)
        }

        return (
                      <Card
              key={comentario.com_id}
              gap={2}
              m={4}
              position="relative" 
              shadow="md" 
              _hover={{ shadow: 'lg' }} 
            >
              <CardHeader>
                <HStack>
                  <Tag size='2md' colorScheme='blue' borderRadius='full'>
                    <Avatar
                      src={usuario.usu_img ? `http://localhost:3344/retornaImgPerfil/${usuario.usu_img}` : ''}
                      size='md'
                    />
                    <TagLabel>{usuario.usu_nome}</TagLabel>
                  </Tag>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text fontSize='xl' fontWeight='normal' as='samp'>{comentario.com_conteudo}</Text>
                <Button marginLeft='864'> <AiFillDelete/></Button>
              </CardBody>
            </Card>
        );
      })}
    </Box>
  );
};

export default CardCom;
