import React, { useState } from "react";
import ToDoForm from "../components/Todo/ToDoForm";
import ToDoList from "../components/Todo/ToDoList";

function HomePage() {
  const [todos, setTodos] = useState([]);

  const addTodoHandler = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: todo }
    ]);
  };

  const deleteTodoHandler = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div>
      <ToDoForm onAddTodo={addTodoHandler} />
      <ToDoList items={todos} onDeleteItem={deleteTodoHandler} />
    </div>
  );
}

export default HomePage;
