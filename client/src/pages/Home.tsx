import { useQuery } from '@apollo/client';

import TaskList from '../components/TaskList/index.tsx';
import TaskForm from '../components/TaskForm/index.tsx';

import { QUERY_TASKS } from '../utils/queries.ts';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TaskForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              title="Some Feed for Task(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
