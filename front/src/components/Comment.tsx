import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface CommentProps {
  author: string;
  text: string;
}

interface CommentResponse {
  author: string;
  text: string;
}

const Comment: React.FC<CommentProps> = () => {
  const [comments, setComments] = useState<CommentResponse[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get<CommentResponse[]>('http://localhost:3344/CommentForms'); // Puxar os dados do comentário
      setComments(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentarios:', error);
    }
  };

  const handleCommentSubmit = async (comment: CommentResponse) => {
    try {
      const response = await axios.post<CommentResponse>('http://localhost:3344/CommentList', comment);
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Erro ao enviar comentarios:', error);
    }
  };

  return (
    <div className="comment">
      <CommentList comments={comments} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default Comment;