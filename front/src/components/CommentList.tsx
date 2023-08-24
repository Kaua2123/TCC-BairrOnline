
interface Comment {
  author: string;
  text: string;
}

interface CommentListProps {
  comments: Comment[]; // Usando o tipo Comment para o array comments
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <Comment key={index} author={comment.author} text={comment.text} />
      ))}
    </div>
  );
};

export default CommentList;