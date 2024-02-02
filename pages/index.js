import ToDoForm from "../components/Todo/ToDoForm";
import ToDoList from "../components/Todo/ToDoList";
import { MongoClient } from "mongodb";
import { useState } from "react";

function HomePage(props) {

  const [todos,setTodos] = useState (props.todos || [])
 
  const  addTodoHandler = async(todo) => {

    const response = await fetch('/api/new-todo',{
        method:"POST",
        body:JSON.stringify(todo),
        headers:{
            'Content-Type':'application/json'
        }
       })

       const data = await response.json()
        const newTodo = { id: data.id, text: data.text };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
     
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

    const client = await MongoClient.connect('mongodb+srv://roshgupta17:Anika123456@cluster0.dlnrdlu.mongodb.net/todos?retryWrites=true&w=majority')
    const db = client.db();
    const todosCollection = db.collection('todos');
  
    const todos = await todosCollection.find().toArray();
    client.close()
  
    return {
      props: {
        todos: todos.map(todo=>({
          text:todo.text,
          id:todo._id.toString()
  
        }))
      },
      
      revalidate:10
    };
  }

export default HomePage;

