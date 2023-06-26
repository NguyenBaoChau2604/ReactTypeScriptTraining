import {
  ChangeEvent,
  useState,
} from 'react';

interface Props {
  onAddTask: (title: string, time: number) => void;
}

export default function ToDoCard({ onAddTask }: Props) {
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }
    if (event.target.name === "time") {
      setTime(Number(event.target.value));
    }
  }

  function addTask() {
    onAddTask(title, time);
    setTitle("");
    setTime(0);
  }

  return (
    <div className="todoCard">
      <div className="flex flex-row rounded-md border-gray-400 m-2">
        <input
          type="text"
          className="w-80 form-control bg-slate-200"
          aria-describedby="basic-addon1"
          name="title"
          value={title}
          onChange={handleChange}
        ></input>
        <button className="addButton p-1 ml-2 bg-orange-300" onClick={addTask}>
          Add
        </button>
      </div>
    </div>
  );
}
