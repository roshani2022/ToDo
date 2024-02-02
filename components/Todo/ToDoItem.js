// import React from "react";
// import Card from "../ui/Card";

// import classes from "./ToDoItem.module.css";

// const ToDoItem = (props) => {
//   const deleteHandler = () => {
//     props.onDelete(props.id);
//   };

//   console.log(props);

//   return (
//     <Card>
//       {
//         <li className={classes.todoitem}>
//           {props.text}
//           <button>Edit</button>
//           <button onClick={() => deleteHandler()}>Delete</button>
//           <button>Update</button>
//         </li>
//       }
//     </Card>
//   );
// };

// export default ToDoItem;

import React from "react";
import Card from "../ui/Card";

import classes from "./ToDoItem.module.css";

const ToDoItem = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  console.log(props);

  return (
    <Card>
      {
        <li className={classes.todoitem}>
          <input type="checkbox" id={`checkbox-${props.id}`} />
          <label htmlFor={`checkbox-${props.id}`} className={classes.checkbox}></label>
          {props.text}
          <button>Edit</button>
          <button onClick={() => deleteHandler()}>Delete</button>
          <button>Update</button>
        </li>
      }
    </Card>
  );
};

export default ToDoItem;

