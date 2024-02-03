import ToDoList from "../../../components/Todo/ToDoList";

import { useState, useEffect } from "react";

function CompletePage(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/completed-todo");
        const data = await response.json();
        if (data) {
          setTodos(data.todos);
          console.log(data);
          console.log("gettting data", data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchData();
  }, []);

  const deleteTodoHandler = async (todoId) => {
    // Remove the todo from the local state
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
  };

  return (
    <div>
      <ToDoList todos={todos} onDelete={deleteTodoHandler} />
    </div>
  );
}

export default CompletePage;
