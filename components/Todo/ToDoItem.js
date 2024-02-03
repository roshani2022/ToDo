
import React from "react";
import Card from "../ui/Card";

import classes from "./ToDoItem.module.css";

const ToDoItem = (props) => {

  const deleteHandler = async(id) => {
    props.onDelete(id);

    try {
      const response = await fetch(`/api/delete-todo?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo.");
      }

    } catch (error) {
      console.error("Error deleting todo:", error);
    }
      
  };

  const completeHandler = async (id) => {
    try {
      const response = await fetch(`/api/update-todo?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "complete" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Card>
      {
        <li className={classes.todoitem}>
           <input type="checkbox" id={`checkbox-${props.id}`} />
          <label htmlFor={`checkbox-${props.id}`} className={classes.checkbox}></label>
          {props.text}
          <button>Edit</button>
          <button onClick={() => deleteHandler(props.id)}>Delete</button>
          <button onClick={() => completeHandler(props.id)}>Update</button>
        </li>
      }
    </Card>
  );
};

export default ToDoItem;


