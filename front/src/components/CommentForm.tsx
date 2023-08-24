import React, { useState, FormEvent } from 'react';
import ButtonCom from './ButtonCom';
import { Textarea } from '@chakra-ui/react';

interface CommentFormProps {
  onCommentSubmit: (comment: { author: string; text: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCommentSubmit }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCommentSubmit({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="@kauazinpaidetodos"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Textarea 
        placeholder="No que está pensando?"
        value={text}
        onChange={(e) => setText(e.target.value)}
         />
      
        <button type="submit">Enviar</button>
        <ButtonCom type="submit"/>
      </form>
    </div>
  );
};

export default CommentForm;