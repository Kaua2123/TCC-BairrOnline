import React, { useEffect, useState } from "react";
import axios from 'axios';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Faz a requisição para buscar os comentários
    axios.get('http://localhost:3344/buscarComentario') 
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar comentários:', error);
      });
  }, []);

  return (
    <div>
      <ul>
        {comments.map(comment => (
          <li key={comment.com_id}>
            <strong>@{comment.denunciante_usuario_usu_cod}</strong>
            <p>{comment.com_conteudo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;