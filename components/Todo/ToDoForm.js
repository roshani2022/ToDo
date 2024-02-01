import React, { useState } from "react";
import Card from "../ui/Card";
import classes from "./ToDoForm.module.css";

const ToDoForm = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const todoInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredValue.trim()) {
      alert("Please enter a valid todo!");
      return;
    }
    props.onAddTodo(enteredValue);
    setEnteredValue("");
  };

  return (
    <Card>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form}>
          <label>ToDay Task</label>
          <input type="text" value={enteredValue} onChange={todoInputChangeHandler} />
        </div>
        <button type="submit">Add Goal</button>
      </form>
    </Card>
  );
};

export default ToDoForm;
