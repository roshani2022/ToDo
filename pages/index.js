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
        setTodos(data.todos);
        console.log(data)
        console.log("gettting data",data);
      }} catch (error) {
        console.error("Error fetching todos:", error);
      }
    
   
    }
   
    fetchData();
  }, []);

  const addTodoHandler = async (todo) => {
    const { text,status } = todo;

    setTodos((prevTodos) => [
      ...prevTodos,
      { _id: Math.random().toString(), text: todo.text,status:"incomplete" },
    ]);
     console.log(todo)
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

  const deleteTodoHandler = async (todoId) => {
      // Remove the todo from the local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
  
  };
  

  return (
    <div>
      <ToDoList todos={todos}  onDelete={deleteTodoHandler}/>
      <ToDoForm onAddTodo={addTodoHandler} />
      
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    process.env.MONGODB_URI
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();
  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        text: todo.text,
        status:"incomplete",
        id: todo._id.toString(),
      })),
    },

    revalidate: 10,
  };
}

export default HomePage;
