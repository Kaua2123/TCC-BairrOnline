
interface CommentData {
  author: string;
  text: string;
}

interface CommentListProps {
  comments: CommentData[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="CommentList">
      {comments.map((comment, index) => (
        <div key={index}>
          <p>Author: {comment.author}</p>
          <p>Text: {comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;