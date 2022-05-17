import FullCalendar from "@fullcalendar/react"; // must be first
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { getAuth } from "firebase/auth";
import classes from "./Calendar.module.css";
import CalendarSideBar from "../CalendarSideBar/CalendarSideBar";
import { useEffect, useState } from "react";
import AddEventModal from "../AddEventModal/AddEventModal";
import { getDatabase, ref, push } from "firebase/database";
import {
  removeEventFromFirebase,
  uuidv4,
} from "../../firebase/firebaseDatabase";

const Calendar = (props) => {
  const [toggleWeekends, setToggleWeekends] = useState(true);
  const [toggleWeekNumber, setToggleWeekNumber] = useState(false);
  const [objState, setObjState] = useState({});
  const [addEventModal, setAddEventModal] = useState(false);
  const [eventsArray, setEventsArray] = useState([]);

  const auth = getAuth();
  const db = getDatabase();

  // -----------------------------------------------------------------------------------
  // To get logged user Events from DB and show them on calendar right after logging in
  // -----------------------------------------------------------------------------------
  useEffect(() => {
    let events = [];
    fetch(
      `https://todo-react-21854-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser.uid}/events.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        for (const property in responseData) {
          events.push(responseData[property]);
        }
        setEventsArray(events);
      });
  }, [auth.currentUser.uid]);

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

    const randomId = uuidv4();

    console.log(calendar);
    if (reference) {
      calendar.addEvent({
        title: reference,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        id: randomId,
      });

      // Pushing Calendar Events to Database
      push(ref(db, "users/" + auth.currentUser.uid + "/events"), {
        title: reference,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        id: randomId,
      });
    }
  };

  const closeModalHandler = () => {
    setAddEventModal(false);
  };

  const removeEventHandler = (clickInfo) => {
    eventsArray.filter((event) => {
      if (event.id === clickInfo.event.id) {
        removeEventFromFirebase(clickInfo);
        clickInfo.event.remove();
      }
    });
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
          weekends={toggleWeekends}
          weekNumbers={toggleWeekNumber}
          eventClick={removeEventHandler}
          events={eventsArray}
        />
      </div>
    </div>
  );
};

export default Calendar;
