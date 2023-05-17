import "smart-webcomponents-react/source/styles/smart.default.css";
import React from "react";
import { ReactDOM } from "react";

import * as dotenv from "dotenv";

import {
  Button,
  RepeatButton,
  ToggleButton,
  PowerButton,
} from "smart-webcomponents-react/button";
import { Calendar } from "smart-webcomponents-react/calendar";
import { Input } from "smart-webcomponents-react/input";
import { Tree, TreeItem, TreeItemsGroup } from "smart-webcomponents-react/tree";
import { Scheduler } from "smart-webcomponents-react/scheduler";

import { ProgressBar } from "smart-webcomponents-react/progressbar";
import { Rating } from "smart-webcomponents-react/rating";

dotenv.config();

class Calendar1 extends React.Component {
  constructor(props) {
    super(props);

    this.scheduler = React.createRef();
    this.calendar = React.createRef();
    this.tree = React.createRef();
    this.primaryContainer = React.createRef();

    const today = new Date(),
      currentDate = today.getDate(),
      currentYear = today.getFullYear(),
      currentMonth = today.getMonth();

    this.nonworkingDays = this.getPastThreeWeekdays(today.getDay());

    this.state = {
      data: [{
        "events": [ {
          "Test": {
            "allDay": true,
            "dateStart": "2023-05-16T04:00:00.000Z",
            "dateEnd": "2023-05-17T03:59:59.999Z",
            "label": "Test",
            "description": "Test",
            "conference": "",
            "Time_in": "230516_12:44:28 PM",
            "Event_time": "20230516_04:00",
            "uuid": "f3977b11-a915-4d0b-9b25-4c6d804e094c"
          }
        }
        ]
      }],
    };
  }

  view = "week";

  views = [
    "day",
    {
      type: "week",
      hideWeekend: false,
    },
    {
      type: "month",
      hideWeekend: false,
      shortcutKey: "m",
    },
    "agenda",
  ];

  firstDayOfWeek = 1;

  disableDateMenu = false;

  currentTimeIndicator = true;

  scrollButtonsPosition = "far";

  getPastThreeWeekdays(weekday) {
    let weekdays = [];

    for (let i = 0; i < 3; i++) {
      weekdays.push((weekday - i + 7) % 7);
    }

    return weekdays;
  }

  handleToggle() {
    const primaryContainer = this.primaryContainer.current,
      scheduler = this.scheduler.current;

    primaryContainer.classList.toggle("collapse");

    scheduler.disableDateMenu =
      !primaryContainer.classList.contains("collapse");
  }

  addNew() {
    this.scheduler.current.openWindow({
      class: "event",
    });
  }

  handleCalendarChange(event) {
    this.scheduler.current.dateCurrent = event.detail.value;
  }

  handleTreeChange() {
    const tree = this.tree.current;
    let selectedIndexes = tree.selectedIndexes,
      types = [];

    for (let i = 0; i < selectedIndexes.length; i++) {
      tree.getItem(selectedIndexes[i]).then((result) => {
        types.push(result.value);

        if (i === selectedIndexes.length - 1) {
          this.scheduler.current.dataSource = this.data.filter(
            (d) => types.indexOf(d.class) > -1
          );
        }
      });
    }
  }

  handleDateChange(event) {
    this.scheduler.current.selectedDates = [event.detail.value];
  }

  getCalendarData = async () => {
    const response = await fetch(
      `https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/calendar/get_events`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    let calendarData = await response.json();

    //console.log(`GetCalendarData: ${JSON.stringify(calendarData, null, 2)}`);

    this.calendarHandler(calendarData);

    if (this.state) {
      //console.log(`Calendar data state: ${JSON.stringify(this.state.data, null, 2)} `);
    };
  };

  calendarHandler(calendarData) {
    delete calendarData["_id"];
    delete calendarData["_rev"];

    if (calendarData !== this.state.data) {
      this.setState({
        data: calendarData,
      });
    }
  };

  refreshData (action, eventItem) {
    switch (action) {
      case "update":
        fetch(
          `https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/calendar/update_event`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventData: eventItem,
              eventTitle: eventItem.label,
            }),
            credentials: "include",
          }
        );

        break;
      case "insert":
        fetch(
          `https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/calendar/insert_event`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventData: eventItem.item,
              eventTitle: eventItem.item.label,
            }),
            credentials: "include",
          }
        );

        break;
      case "delete":
        fetch(
          `https://${process.env.host}:${process.env.feeler_back_port}/calendar/delete_event`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventData: eventItem,
              eventTitle: eventItem.label,
            }),
            credentials: "include",
          }
        );

        break;
      default:
        console.log(JSON.stringify(`Default:`, null, 2));
        break;
    }

    setTimeout(this.getCalendarData, 3000);
  };

  handleItemUpdate = (event) => {
    this.refreshData("update", event.detail.item);
  }

  handleItemRemove = (event) => {
    this.refreshData("delete", event.detail.item);
  }

  handleItemInsert = (event) => {
    this.refreshData("insert", event.detail);

    console.log(`Event: ${JSON.stringify(event.detail, null, 2)}`);
  }

  updateData = (event) => {
    const item = event.detail.item,
      data = this.data;

    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];

      if (dataItem.label === item.label && dataItem.class === item.class) {
        event.type === "itemRemove"
          ? this.data.splice(i, 1)
          : data.splice(i, 1, item);
        return;
      }
    }
  }

  handleEditDialogOpen = (event) => {
    const editors = event.detail.editors;

    if (!editors) {
      return;
    }

    const schedulerEvent = event.detail.item,
      descriptionEditor = editors.description,
      dateStartEditor = editors.dateStart,
      dateEndEditor = editors.dateEnd,
      labelEditor = editors.label,
      allDayEditor = editors.allDay,
      repeatEditor = editors.repeat,
      editorsContainer = editors.description.parentElement;

    console.log(`Event: ${JSON.stringify(schedulerEvent, null, 2)}`);

    dateStartEditor.querySelector(".smart-element").disabled = false;
    dateEndEditor.querySelector(".smart-element").disabled = false;

    // repeatEditor.classList.add('smart-hidden');
    // allDayEditor.classList.add('smart-hidden');

    labelEditor.querySelector(".smart-element").placeholder =
      "Enter a label...";
    descriptionEditor.querySelector(".smart-element").placeholder =
      "Enter a description for the event..";

    //ProgressBar
    let progressElement = editorsContainer.querySelector("#eventProgress");

    if (!progressElement) {
      const elementContainer = document.createElement("div");

      ReactDOM.createRoot(
        <div>
          <Rating id="eventRating"></Rating>

          <label>Progress: </label>
          <ProgressBar id="eventProgress" showProgressValue></ProgressBar>
        </div>,
        elementContainer,
        function () {
          this.querySelector("#eventProgress").value =
            schedulerEvent.progress || 0;
        }
      );

      editorsContainer.appendChild(elementContainer);
    } else {
      progressElement.value = schedulerEvent.progress || 0;
    }
  }

  componentDidUpdate(prevProps) {
    /*
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      if (this.props.isLoggedIn === true) {
        setTimeout(this.getCalendarData, 3000);
      }
    }
    */
  };

  componentDidMount() {
    setInterval(this.getCalendarData, 20000);
  };

  render = () => {
    let data = this.state.data;
    
    return (
      <div className="row">
        <div className="col-md grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title"> Calendar </h4>
              </div>

              <div id="primaryContainer" ref={this.primaryContainer}>
                <div id="header">
                  <Button
                    id="toggleButton"
                    onClick={this.handleToggle.bind(this)}
                  >
                    Toggle
                  </Button>

                  <Button
                    id="addNew"
                    onClick={this.addNew.bind(this)}
                  >
                    New
                  </Button>
                </div>

                <div className="content">
                  <section id="sideA">
                    <div className="button-container">
                      <div id="logo"></div>
                    </div>
                  </section>

                  <section id="sideB">
                    <Scheduler
                      ref={this.scheduler}
                      id="scheduler"
                      dataSource={data}
                      view={this.view}
                      views={this.views}
                      nonworkingDays={this.nonworkingDays}
                      firstDayOfWeek={this.firstDayOfWeek}
                      //disableDateMenu={this.disableDateMenu}
                      currentTimeIndicator={this.currentTimeIndicator}
                      scrollButtonsPosition={this.scrollButtonsPosition}
                      onDragEnd={this.updateData.bind(this)}
                      onResizeEnd={this.updateData.bind(this)}
                      onItemUpdate={this.handleItemUpdate.bind(this)}
                      onItemRemove={this.handleItemRemove.bind(this)}
                      onItemInsert={this.handleItemInsert.bind(this)}
                      onDateChange={this.handleDateChange.bind(this)}
                    // onEditDialogOpen={this.handleEditDialogOpen.bind(this)}
                    ></Scheduler>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Calendar1;
