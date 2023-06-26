import {
  ChangeEvent,
  useState,
} from 'react';

import { ITask } from '../../interface/todolist';

interface Props {
  task: ITask;
  completeTask(task: ITask): void;
  deleteTask(task: ITask): void;
  updateTask(task: ITask): void;
}

export default function TodoItem({
  task,
  completeTask,
  deleteTask,
  updateTask,
}: Props) {
  const [updatedTask, setUpdatedTask] = useState<ITask>(task);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  function handleSave() {
    updateTask(updatedTask);
    setIsEditing(false);
  }

  return (
    <div>
      <div className="task m-2 p-2 border-solid rounded-md border-gray-400 bg-white">
        <div className="content flex flex-row">
          <input
            type="text"
            className="w-80 form-control bg-slate-200"
            aria-describedby="basic-addon1"
            name="title"
            value={isEditing ? updatedTask.title : task.title}
            onChange={handleChange}
          ></input>
          <input
            className="form-check-input ml-2 mt-0 w-4 h-4 self-center"
            type="checkbox"
            value=""
            aria-label="Checkbox for following text input"
            checked={task.isDone}
            onChange={() => {
              completeTask(task);
            }}
          ></input>
          <div className="flex flex-row">
            {!isEditing && (
              <button
                className="addButton p-1 ml-2 bg-white rounded-md border-orange-400 w-16"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            {isEditing && (
              <button
                className="addButton p-1 ml-2 bg-white rounded-md border-orange-400 w-16"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </div>
          <button
            className="addButton ml-2 p-1 bg-white rounded-md border-orange-400 w-16 h-12"
            onClick={() => {
              deleteTask(task);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
