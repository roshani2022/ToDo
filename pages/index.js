import ToDoForm from "../components/Todo/ToDoForm";
import ToDoList from "../components/Todo/ToDoList";
import { MongoClient } from "mongodb";
import { useState, useEffect } from "react";

function HomePage(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/all-todo");
        const data = await response.json();
        if (data) {
        //   const todos = Object.entries(data).map(([id, todo]) => ({
        //     id,
        //     ...todo,
        //   }));
        // setTodos(todos);
        setTodos(data.todos);
        console.log("gettting data",data);
      }} catch (error) {
        console.error("Error fetching todos:", error);
      }
    
   
    }

    fetchData();
  }, []);

  const addTodoHandler = async (todo) => {
    const { text } = todo;

    setTodos((prevTodos) => [
      ...prevTodos,
      { _id: Math.random().toString(), text: todo.text },
    ]);

    const response = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data)
  };

  // const deleteTodoHandler = (todoId) => {
  //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  // };

  return (
    <div>
      <ToDoForm onAddTodo={addTodoHandler} />
      <ToDoList todos={todos} />
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://roshgupta17:Anika123456@cluster0.dlnrdlu.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        text: todo.text,
        id: todo._id.toString(),
      })),
    },

    revalidate: 10,
  };
}

export default HomePage;
