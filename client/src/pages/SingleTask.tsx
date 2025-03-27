import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import CommentList from '../components/CommentList/index.tsx';
import CommentForm from '../components/CommentForm/index.tsx';

import { QUERY_SINGLE_TASK } from '../utils/queries.ts';
import { REMOVE_TASK } from '../utils/mutations.ts';

const SingleTask = () => {
  const { taskId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_TASK, {
    variables: { taskId: taskId },
  });


  const [RemoveTask, { error }] = useMutation(REMOVE_TASK);

  const removeTask = async () => {
    try {
      await RemoveTask({
        variables: { taskId: taskId },
      });
      window.location.replace('/');
    } catch (err) {
      console.error(err);
    }
  }

  const task = data?.task || {};
  console.log("Tasks:", task); 
  if (loading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error... {error.message}</div>;
  }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {task.taskAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          Added this item on {new Date(Number(task.createdAt)).toLocaleString()}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {task.taskText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={task.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm taskId={task._id} />
      </div>
      <div>
        <button onClick={removeTask}>Remove Task</button>
      </div>
    </div>
  );
};

export default SingleTask;
