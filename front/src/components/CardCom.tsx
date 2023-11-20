import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Box, HStack, Text, Tag, TagLabel} from '@chakra-ui/react';

const CardCom = ({ denCod }) => {

  const [comentarios, setComentarios] = useState([]);

  async function getComentarios () { //pega os comentários utilizando o codigo das denuncias como parametro

    const token = localStorage.getItem('token'); //primeiro pegar o token, pois é uma rota protegida
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
      }

   await axios.get(`http://localhost:3344/buscarComentario/${denCod}`)
      .then(response => {
        setComentarios(response.data)
        console.log('comentarios buscados: ', response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar comentarios', error);
      })

  }

  useEffect(() => {
    getComentarios();

  }, [])


  return (
    <Box>
      {comentarios.map((comentario) => (
        <Box key={comentario.com_id} gap={3} m={4}>
          <HStack>
          <Tag size='sm' colorScheme='blue' borderRadius='full' >
                    {/* {usuImg ? ( vai ter q dar um get no usuarios pra pegar esses atributos aq e mostrar o icone do usuario, msm coisa pro nome
                        <Avatar src={`http://localhost:3344/retornaImgPerfil/${usuImg}`} size='xs' name={usuNome} ml={-1} mr={2}> </Avatar>
                    ) : (
                       
                       <Avatar
                            size='xs'
                            name={usuNome}
                            ml={-1}
                            mr={2}
                        /> 
                    )} */} 
                        
                        <Avatar size='xs'/>
                        <TagLabel>Nome Usuario</TagLabel>
                    </Tag>
            {/* puxar o avatar do usuario, q nem no header */}
            <Text>{comentario.com_conteudo}</Text>
          </HStack>
  
        </Box>
      ))}
    </Box>
  );
};

export default CardCom;