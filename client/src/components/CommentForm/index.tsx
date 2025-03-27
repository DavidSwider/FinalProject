import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_TASK } from '../../utils/queries';
import { UPDATE_TASK } from '../../utils/mutations';

const UpdateTaskForm = ({ taskId }: any) => {
  const [taskText, settaskText] = useState('');
  const [category, setCategory] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [updateTask, { error }] = useMutation(UPDATE_TASK);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await updateTask({
        variables: { 
          taskId, 
          input: { taskText, category } 
        }
      });

      settaskText('')
      setCategory('')
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'taskText' && value.length <= 280) {
      settaskText(value);
      setCharacterCount(value.length);
    } else {
      setCategory(value);
    }
  };

  return (
    <div>
      <h4>Change your Item as you would like.</h4>
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        
        <div className="col-12 col-lg-9">
          <textarea
            name="taskText"
            placeholder="Update your task..."
            value={taskText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
