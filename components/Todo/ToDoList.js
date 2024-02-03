import React from 'react';
import ToDoItem from './ToDoItem'

function ToDoList(props) {
  console.log(props)
  return (
    <ul>
      {props.todos.map((todo,index) => (
        <ToDoItem 
          key={index}
          id={todo._id}
          text={todo.text}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
