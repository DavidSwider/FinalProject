import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';
import { QUERY_TASKS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const TaskForm = () => {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('other');
  const [characterCount, setCharacterCount] = useState(0);

  

  const [addTask, { error }] = useMutation
  (ADD_TASK, {
    refetchQueries: [
      QUERY_TASKS,
      'getTasks',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addTask({
        variables: { input:{
          taskText,
          category,
        }},
      });

      setTaskText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
  
      if (name === 'taskText' && value.length <= 280) {
        setTaskText(value);
        setCharacterCount(value.length);
      } else if (name === 'category') {
        setCategory(value);
      }
    };

  return (
    <div>
      <h3>What's on your agenda today?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="category">Choose a category:</label>

<select name="category" id="category" onChange={handleChange} value = {category}
>
  <option value="other">other</option>
  <option value="personal">personal</option>
  <option value="work">work</option>
  <option value="chores">chores</option>
  <option value="school">school</option>
</select>
            <div className="col-12 col-lg-9">
              <textarea
                name="taskText"
                placeholder="Add a New Item Here..."
                value={taskText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Item
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add your items. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TaskForm;
