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
        
        <strong>{author} @kauazinpaidetodos</strong>
        <Textarea 
        placeholder="No que está pensando?"
        value={text}
        onChange={(e) => setText(e.target.value)}
         />
      
        <ButtonCom type="submit"/>
      </form>
    </div>
  );
};

export default CommentForm;