import { useEffect, useState } from "react";
import axios from 'axios';

const CommentList = ({ denuncia }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Verifica se a denuncia está definida e não é nula, antes de fazer a solicitação
    if (denuncia && denuncia.den_cod) {
      axios.get(`http://localhost:3344/buscarComentario/${denuncia.den_cod}`)
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar comentários', error);
        });
    }
  }, [denuncia]);

  return (
    <div>
      <ul>
        {comments.map(comment => (
          <li key={comment.com_id}>
            <strong>@{comment.usuario_usu_cod}</strong>
            <p>{comment.com_conteudo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;