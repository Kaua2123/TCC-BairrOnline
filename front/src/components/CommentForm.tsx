import { useState } from "react";
import axios from 'axios';
import { Textarea, useToast, FormControl, Button, Card, Text,} from '@chakra-ui/react';

//programation
import jwt_decode from 'jwt-decode';

const CommentForm = ({ denuncia, }) => {
  const [comCont, setComCont] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');

  const toast = useToast();


  const enviaCom = async () => {
    if (!comCont.trim()) {
      toast({
        title: 'Error',
        description: "O campo não pode estar vazio",
        status: 'error',
        duration: 4000,
        isClosable: true
      });
      return;
    }

    const token = localStorage.getItem('token');
    if(!token){
      toast({
        title: 'Usuário não autenticado',
        description: 'Logue para realizar comentários.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      return;
    }

    const decodificaToken: any = await jwt_decode(token);


    try {
      const response = await axios.post('http://localhost:3344/criarComent', {
        com_conteudo: comCont,
        com_data: new Date(),
        usuario_usu_cod: decodificaToken.usu_cod,
        denuncias_den_cod: denuncia.den_cod,
      }); 

      console.log('Comentário enviado');
      console.log(response.data);

      //Atualiza o estado para exibir o comentário enviado
      setSubmittedComment(comCont);
      setComCont('');

    } catch (error) {
      console.error('Falha ao enviar comentário!', error);
      toast({
        title: 'Erro',
        description: "Falha ao enviar comentário, tente novamente mais tarde.",
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  };

  return (
    <div className="comment-form">
        <FormControl>
          <strong>@kauapaidetodos</strong>
          <Textarea
            placeholder="No que está pensando?"
            value={comCont}
            onChange={(e) => setComCont(e.target.value)}
          />
          <Button type="submit" onClick={enviaCom}>Enviar</Button>
        </FormControl>

      {submittedComment && (
        <Card mt={4}>
          <strong>@kauapaidetodos</strong>
          <Text>{submittedComment}</Text>
        </Card>
      )}
    </div>
  );
};

export default CommentForm;