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
  uuidv4,
  removeEventFromFirebase,
  getEvents,
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
  // This useEffect down below is to get logged user events from DB
  //  and show them on calendar right after logging in
  // ------------------------------------------------------------------------

  useEffect(() => {
    const initializeEvents = async () => {
      const data = await getEvents(auth.currentUser.uid);
      for (const randomId in data) {
        setEventsArray((prevState) => [...prevState, data[randomId]]);
      }
    };

    initializeEvents().catch((error) => console.log(error));
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

    const randomId = uuidv4();

    const obj = {
      allDay: selectInfo.allDay,
      end: selectInfo.endStr,
      id: randomId,
      start: selectInfo.startStr,
      title: reference,
    };

    if (reference) {
      calendar.addEvent(obj);

      // Pushing Calendar Events to Database
      push(ref(db, "users/" + auth.currentUser.uid + "/events"), obj);

      // Pushing event to the array so I can delete it without reloading the page
      // Basically updating main array
      eventsArray.push(obj);
    }
  };

  const closeModalHandler = () => {
    setAddEventModal(false);
  };

  const removeEventHandler = (clickInfo) => {
    eventsArray.forEach((event) => {
      if (event.id === clickInfo.event.id) {
        removeEventFromFirebase(clickInfo).catch((err) => console.log(err));
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
        events={eventsArray}
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
