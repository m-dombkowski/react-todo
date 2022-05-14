import FullCalendar from "@fullcalendar/react"; // must be first import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import classes from "./Calendar.module.css";

const Calendar = () => {
  return (
    <div className={classes.calendarContainer}>
      <div className={classes.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
