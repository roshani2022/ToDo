import React from 'react';
import ToDoItem from './ToDoItem'

function ToDoList(props) {
  console.log(props)
  return (
    <ul>
      {props.todos.map(todo => (
        <ToDoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          onDelete={props.onDeleteItem}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
