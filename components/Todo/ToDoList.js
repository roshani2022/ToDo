import React from 'react';
import ToDoItem from './ToDoItem'

function ToDoList(props) {
  return (
    <ul>
      {props.items.map(todo => (
        <ToDoItem
          key={todo.id}
          id={todo.id}
          onDelete={props.onDeleteItem}
        >
          {todo.text}
        </ToDoItem>
      ))}
    </ul>
  );
}

export default ToDoList;
