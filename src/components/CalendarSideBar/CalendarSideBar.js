import classes from "./CalendarSideBar.module.css";

const CalendarSideBar = (props) => {
  return (
    <div className={classes.sideBar}>
      <section className={classes.instructionSection}>
        <h2>Instruction</h2>
        <ul>
          <li>Click on a date to add event</li>
          <li>
            You can also drag through multiple days/hours to add longer event
          </li>
          <li>Click on an event to delete it</li>
          <li>In month view you can add "all day" events</li>
          <li>
            To add event for a specific period of time durning the day use
            week/day view (top right corner of calendar)
          </li>
        </ul>
      </section>
      <section>
        <h2>Helpers</h2>
        <div className={classes.helperButtons}>
          <button type="button" onClick={props.onChangeWeekend}>
            {props.weekendState ? "Hide Weekends" : "Show Weekends"}
          </button>
          <button type="button" onClick={props.onChangeWeekNumber}>
            {props.weekNumberState ? "Hide Week Number" : "Show Week Number "}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CalendarSideBar;
