import { useEffect, useState, useRef } from "react";
import TodoItem from "./TodoItem";
import "./TodoApp.css";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  //Recover input focus
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    //No Empty validation
    if (title == "") {
      alert("The title cannot be empty.");
      return;
    }

    //Add new todo in todos
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        Title: title,
      },
    ]);

    setTitle("");
  }

  //Update title state when the value of the field change
  function handleChange(e) {
    setTitle(e.target.value);
  }

  //Reference funcion to update state inside a child component
  function handleOnUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id == id);
    item.Title = value;
    setTodos(temp);
  }

  //Find and delete a todo
  function handleOnDelete(id) {
    const temp = todos.filter((item) => item.id != id);
    setTodos(temp);
  }

  //Recover focus
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="todoContainer">
      <div className="heading">
        <div>
          <h1>To Do App</h1>
          <p>Add your pending tasks here</p>
        </div>
        <div className="counters">
          <span className="pendingTitle">Pending</span>
          <span className="pendingNumber">{todos.length}</span>
        </div>
      </div>

      <div className="container">
        <form action="" className="todoCreateForm" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            onChange={handleChange}
            className="todoInput"
            value={title}
            placeholder="Task title"
          />
          <input
            onClick={handleSubmit}
            type="submit"
            value="New task"
            className="buttonCreate"
          />
        </form>
        <div className="todosList">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onUpdate={handleOnUpdate}
              onDelete={handleOnDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
