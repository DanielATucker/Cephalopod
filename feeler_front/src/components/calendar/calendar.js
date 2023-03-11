import React from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false
    };
  }

  componentDidMount() {
    // load event data
    this.calendar.update({
      startDate: "2023-03-07",
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2023-03-11T10:30:00",
          end: "2023-03-11T13:00:00"
        }
      ]
    });

    this.getCalendarData();
  };

  getCalendarData = async () => {
    const response = await fetch('https://100.108.10.15:3001/calendar/get_events', {
      method: 'GET',
      credentials: "include"
    });

    let node = await response.json();

    if ((node !== "No node found") && (node !== "undefined") ) {
      this.calendarsHandler(node)
    }
  };

  calendarsHandler = (node) => {        
    console.log(JSON.stringify(`CALENDAR: ${node}`, null, 2));
  }


  get calendar() {
    return this.calendarRef.current.control;
  }

  render() {
    const {...config} = this.state;
    return (
      <>
      <h1>Calendar</h1>

      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={3}
            skipMonths={3}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
          />
        </div>
        
        <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          ref={this.calendarRef}
        />
        </div>
      </div>
      </>
    );
  }
}

export default Calendar;