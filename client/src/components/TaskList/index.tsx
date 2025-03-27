// Import `<Link>` component from React Router for internal hyperlinks
import { Link } from 'react-router-dom';

interface Task {
  _id: string;
 // taskAuthor: string;
  createdAt: string;
  taskText: string;
  category: string;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks: Task[];
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title }) => {
  if (!tasks.length) {
    return <h3>No Items Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {tasks &&
        tasks.map((task) => (
          <div key={task._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {task.category} <br />
              <span style={{ fontSize: '1rem' }}>
                Added this Item on {new Date(Number(task.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{task.taskText}</p>
            </div>
            {/* Create a link to this task's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/tasks/${task._id}`}
            >
              Update your Item.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
