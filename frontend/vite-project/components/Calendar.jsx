import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({
  events,
  eventClick,
  dateClick,
  eventBackgroundColor,
  height,
}) => {
  return (
    <FullCalendar
      height={height}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={eventClick}
      eventBackgroundColor={eventBackgroundColor}
      dateClick={dateClick}
    />
  );
};

export default Calendar;
