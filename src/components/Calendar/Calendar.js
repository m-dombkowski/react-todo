import FullCalendar from "@fullcalendar/react"; // must be first import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import classes from "./Calendar.module.css";
import CalendarSideBar from "../CalendarSideBar/CalendarSideBar";
import { useState } from "react";
import AddEventModal from "../AddEventModal/AddEventModal";

const Calendar = (props) => {
  const [toggleWeekends, setToggleWeekends] = useState(true);
  const [toggleWeekNumber, setToggleWeekNumber] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  let obj;

  const toggleWeekendsHandler = () => {
    setToggleWeekends((prevState) => !prevState);
  };

  const toggleWeekNumbersHandler = () => {
    setToggleWeekNumber((prevState) => !prevState);
  };

  const addEventHandler = (selectInfo) => {
    let title = prompt("Add Event Title");
    let calendar = selectInfo.view.calendar;
    console.log(selectInfo);

    if (title) {
      calendar.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }

    console.log(calendar);
  };

  const testing = (clickInfo) => {
    console.log(clickInfo);
  };

  const removeEventHandler = (clickInfo) => {
    clickInfo.event.remove();
  };

  return (
    <div
      className={`${addEventModal ? classes.modalOpen : classes.pageContainer}`}
    >
      {/* {addEventModal && <AddEventModal obj={obj} handler={addEvent} />} */}
      <CalendarSideBar
        onChangeWeekend={toggleWeekendsHandler}
        weekendState={toggleWeekends}
        onChangeWeekNumber={toggleWeekNumbersHandler}
        weekNumberState={toggleWeekNumber}
      />
      <div className={classes.calendar}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,list",
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          select={addEventHandler}
          dateClick={testing}
          weekends={toggleWeekends}
          weekNumbers={toggleWeekNumber}
          eventClick={removeEventHandler}
        />
      </div>
    </div>
  );
};

export default Calendar;
