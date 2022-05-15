import FullCalendar from "@fullcalendar/react"; // must be first import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { getAuth } from "firebase/auth";
import classes from "./Calendar.module.css";
import CalendarSideBar from "../CalendarSideBar/CalendarSideBar";
import { useEffect, useState } from "react";
import AddEventModal from "../AddEventModal/AddEventModal";

const Calendar = (props) => {
  const [toggleWeekends, setToggleWeekends] = useState(true);
  const [toggleWeekNumber, setToggleWeekNumber] = useState(false);
  const [objState, setObjState] = useState({});
  const [addEventModal, setAddEventModal] = useState(false);
  // const auth = getAuth();

  // const currentUser = auth.currentUser.accessToken;
  // console.log(currentUser);

  const toggleWeekendsHandler = () => {
    setToggleWeekends((prevState) => !prevState);
  };

  const toggleWeekNumbersHandler = () => {
    setToggleWeekNumber((prevState) => !prevState);
  };

  const testing1 = (selectInfo, ref) => {
    setObjState(selectInfo);
    setAddEventModal(true);
    let calendar = selectInfo.view.calendar;

    if (ref) {
      calendar.addEvent({
        title: ref,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const closeModalHandler = () => {
    setAddEventModal(false);
  };

  // const addEventHandler = (selectInfo) => {
  //   let title = prompt("Add Event Title");
  //   let calendar = selectInfo.view.calendar;
  //   console.log(selectInfo);

  //   if (title) {
  //     calendar.addEvent({
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }

  //   console.log(calendar);
  // };

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
          handler={testing1}
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
          select={testing1}
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
