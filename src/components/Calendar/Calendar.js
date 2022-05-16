import FullCalendar from "@fullcalendar/react"; // must be first
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { getAuth } from "firebase/auth";
import classes from "./Calendar.module.css";
import CalendarSideBar from "../CalendarSideBar/CalendarSideBar";
import { useState } from "react";
import AddEventModal from "../AddEventModal/AddEventModal";
import { getDatabase, ref, push } from "firebase/database";

const Calendar = (props) => {
  const [toggleWeekends, setToggleWeekends] = useState(true);
  const [toggleWeekNumber, setToggleWeekNumber] = useState(false);
  const [objState, setObjState] = useState({});
  const [addEventModal, setAddEventModal] = useState(false);
  const auth = getAuth();
  const db = getDatabase();

  const currentUserId = auth.currentUser.uid;
  console.log(currentUserId);

  const toggleWeekendsHandler = () => {
    setToggleWeekends((prevState) => !prevState);
  };

  const toggleWeekNumbersHandler = () => {
    setToggleWeekNumber((prevState) => !prevState);
  };

  const addEventHandler = (selectInfo, reference) => {
    setObjState(selectInfo);
    setAddEventModal(true);
    let calendar = selectInfo.view.calendar;
    console.log(selectInfo);
    console.log(calendar);
    if (reference) {
      calendar.addEvent({
        title: reference,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });

      // Pushing Calendar Events to Database
      push(ref(db, "users/" + auth.currentUser.uid + "/events"), {
        title: reference,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const closeModalHandler = () => {
    setAddEventModal(false);
  };

  const removeEventHandler = (clickInfo) => {
    clickInfo.event.remove();
  };

  return (
    <div
      className={`${addEventModal ? classes.modalOpen : classes.pageContainer}`}
      // className={classes.pageContainer}
    >
      {addEventModal && (
        <AddEventModal
          obj={objState}
          handler={addEventHandler}
          onClose={closeModalHandler}
        />
      )}
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
          dayMaxEventRows={true}
          select={addEventHandler}
          // dateClick={testing}
          weekends={toggleWeekends}
          weekNumbers={toggleWeekNumber}
          eventClick={removeEventHandler}
        />
      </div>
    </div>
  );
};

export default Calendar;
