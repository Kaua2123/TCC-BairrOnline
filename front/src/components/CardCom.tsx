import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text} from '@chakra-ui/react';

const CardCom = ({ denunCod }) => {
  const [denuncias, setDenuncias] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const denunciasResponse = await axios.get('http://localhost:3344/getDenuncia');
        setDenuncias(denunciasResponse.data);

        const comentariosResponse = await axios.get(`http://localhost:3344/buscarComentario?denuncias_den_cod=${denunCod}`);
        setComentarios(comentariosResponse.data);
      } catch (error) {
        console.error('Erro ao buscar denúncias e comentários:', error);
      }
    };

    fetchData();
  }, [denunCod]);

  return (
    <div>
      {/* Renderização dos comentários */}
      <div>
        {comentarios.map((comentario) => {
          const denunciaRelacionada = denuncias.find(denuncia => denuncia.den_cod === comentario.denuncias_den_cod);

          return (
            denunciaRelacionada && (
              <Box key={comentario.com_id} p={2} borderWidth="1px" borderRadius="md" boxShadow="md" mt={2}>
                <Text>{comentario.com_conteudo}</Text>
              </Box>
            )
          );
        })}
      </div>
    </div>
  );
};

export default CardCom;