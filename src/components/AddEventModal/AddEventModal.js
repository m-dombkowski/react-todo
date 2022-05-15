import { useRef, useState } from "react";
import classes from "./AddEventModal.module.css";

const AddEventModal = (props) => {
  const [ref, setRef] = useState("");
  const addEventRef = useRef();
  // console.log(props.obj);

  const submitHandler = (event) => {
    event.preventDefault();
    setRef(addEventRef.current.value);
    console.log(ref);
    props.handler(props.obj, ref);
    props.onClose();
  };

  return (
    <div className={classes.modal}>
      <form className={classes.modalForm} onSubmit={submitHandler}>
        <label>Add Event Title</label>
        <input ref={addEventRef} type="text"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEventModal;
