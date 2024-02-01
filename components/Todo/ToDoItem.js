import React from 'react';
import Card from '../ui/Card';

import classes from './ToDoItem.module.css'

const ToDoItem = props => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <Card>
      <li className={classes.todoitem}>
        {props.children}
        
        <button>Edit</button>
        <button onClick={()=>deleteHandler()}>Delete</button>
        <button>Update</button>
       
      </li>
    </Card>
  );
};

export default ToDoItem;
