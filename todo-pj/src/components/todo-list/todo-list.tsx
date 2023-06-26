import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { ITask } from '../../interface/todolist';
import ToDoCard from '../todo-card/todo-card';
import TodoItem from '../todo-item/todo-item';

export default function TodoList() {
  const [todolist, setTodoList] = useState<ITask[]>([]);
  const [taskCount, setTaskCount] = useState<number>(0);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const port = "http://localhost:3000";
  useEffect(() => {
    fetchTodoList();
  }, []);

  function fetchTodoList() {
    axios
      .get(port + "/api/todolist")
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((error) => {
        console.log(error);
        setTodoList([]);
      });
  }

  function addTask(title: string) {
    setTaskCount(taskCount + 1);

    axios
      .post(port + "/api/todolist", { title: title })
      .then(() => {
        console.log(todolist);
        fetchTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function completeTask(taskDone: ITask) {
    setTodoList((prevTodoList) =>
      prevTodoList.map((task) => {
        if (task.id === taskDone.id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );

    axios
      .put(port + `/api/todolist/${taskDone.id}`, { title: taskDone.title, isDone: !taskDone.isDone })
      .then(() => fetchTodoList())
      .catch((error) => console.log(error));
  }

  function deleteTask(taskToDelete: ITask) {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((task) => task.id !== taskToDelete.id)
    );

    axios
      .delete(port + `/api/todolist/${taskToDelete.id}`)
      .then(() => fetchTodoList())
      .catch((error) => console.log(error));
  }

  function updateTask(updatedTask: ITask) {
    setTodoList((prevTodoList) =>
      prevTodoList.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      })
    );

    axios
      .put(port + `/api/todolist/${updatedTask.id}`, updatedTask)
      .then(() => fetchTodoList())
      .catch((error) => console.log(error));
  }

  function handleChangeFilter(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setTitleFilter(value);
  }

  const filteredTodoList = todolist.filter((task: ITask) => {
    if (task.title) {
      return task.title.includes(titleFilter);
    }
    return false;
  });

  return (
    <div className="">
      <div className="p-4 bg-white">
        <span className="mr-2">Tìm kiếm</span>
        <input
          type="text"
          value={titleFilter}
          onChange={handleChangeFilter}
          placeholder="Tìm kiếm theo tiêu đề"
        />
      </div>

      <div className="m-6">
        <div className="newTask flex flex-row bg-white w-fit">
          <ToDoCard onAddTask={addTask} />
        </div>

        <div className="todolist w-fit">
          {filteredTodoList.map((task: ITask, key: number) => {
            return (
              <TodoItem
                key={key}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
