import React from 'react';

interface CommentProps {
  author: string;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ author, text }) => {
  return (
    <div className="comment">
      <strong>{author}</strong>
      <p>{text}</p>
    </div>
  );
};

export default Comment;