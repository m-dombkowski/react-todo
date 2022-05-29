import { useRef } from "react";
import classes from "./AddEventModal.module.css";

const AddEventModal = (props) => {
  let ref;
  const addEventRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    ref = addEventRef.current.value;

    props.handler(props.obj, ref);
    props.onClose();
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalHeader}>
        <button
          className={classes.closeModal}
          type="button"
          onClick={props.onClose}
          title="Close Window"
        >
          x
        </button>
        <h2 className={classes.modalTitle}>Create Event</h2>
      </div>
      <form className={classes.modalForm} onSubmit={submitHandler}>
        <label className={classes.inputLabel}>Your Event Title</label>
        <input
          className={classes.modalInput}
          ref={addEventRef}
          type="text"
          placeholder="Title"
        ></input>
        <div>
          <button className={classes.addEventButton} type="submit">
            Add
          </button>
          <button className={classes.clearButton} type="reset">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventModal;
