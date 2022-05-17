import { useRef } from "react";
import classes from "./AddEventModal.module.css";

const AddEventModal = (props) => {
  let ref;
  const addEventRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    ref = addEventRef.current.value;
    console.log(ref);
    props.handler(props.obj, ref);
    props.onClose();
  };

  return (
    <div className={classes.modal}>
      <form className={classes.modalForm} onSubmit={submitHandler}>
        <button type="button" onClick={props.onClose}>
          Close
        </button>
        <label>Add Event Title</label>
        <input ref={addEventRef} type="text"></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEventModal;
