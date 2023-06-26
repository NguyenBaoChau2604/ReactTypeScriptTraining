const express = require("express");
const fs = require("fs");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

let todoList = [];

fs.readFile("todo.json", "utf8", (err, data) => {
  if (err) {
    console.error("Lỗi khi đọc tệp JSON:", err);
  } else {
    todoList = JSON.parse(data);
  }
});

app.get("/api/todolist", (req, res) => {
  res.json(todoList);
});

app.post("/api/todolist", (req, res) => {
  const { title } = req.body;
  const newTodo = { id: Date.now(), title, isDone: false };
  console.log(newTodo);
  todoList.push(newTodo);
  res.status(201).json(newTodo);

  fs.writeFile("todo.json", JSON.stringify(todoList), (err) => {
    if (err) {
      console.error("Lỗi khi ghi dữ liệu vào tệp JSON:", err);
    }
  });
});

app.put("/api/todolist/:id", (req, res) => {
  const { id } = req.params;
  const { title, isDone } = req.body;
  const todoIndex = todoList.findIndex((todo) => todo.id.toString() === id);
  if (todoIndex !== -1) {
    todoList[todoIndex].title = title;
    todoList[todoIndex].isDone = isDone;
    res.json(todoList[todoIndex]);

    fs.writeFile("todo.json", JSON.stringify(todoList), (err) => {
      if (err) {
        console.error("Lỗi khi ghi dữ liệu vào tệp JSON:", err);
      }
    });
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

app.delete("/api/todolist/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todoList.findIndex((todo) => todo.id.toString() === id);
  if (todoIndex !== -1) {
    const deletedTodo = todoList.splice(todoIndex, 1)[0];
    res.json(deletedTodo);

    fs.writeFile("todo.json", JSON.stringify(todoList), (err) => {
      if (err) {
        console.error("Lỗi khi ghi dữ liệu vào tệp JSON:", err);
      }
    });
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
