import { useState } from "react";
import axios from 'axios';
import { Textarea, useToast, FormControl, Button, Card, Text,} from '@chakra-ui/react';

const CommentForm = ({ denCod }) => {
  const [comCont, setComCont] = useState('');
  const [submittedComment, setSubmittedComment] = useState(null);
  const toast = useToast();

  const fixedUsuCod = 1;
  const fixedDenCod = 1; // codigo fixo da denuncia por enquanto 

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

    try {
      const response = await axios.post('http://localhost:3344/criarComent', {
        com_conteudo: comCont,
        com_data: new Date(),
        denunciante_usuario_usu_cod: fixedUsuCod,
        denuncias_den_cod: fixedDenCod,
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