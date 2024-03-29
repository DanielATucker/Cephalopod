import "smart-webcomponents-react/source/styles/smart.default.css";
import React from "react";
import ReactDOM from "react-dom/client";

import {
  Button,
  RepeatButton,
  ToggleButton,
  PowerButton,
} from "smart-webcomponents-react/button";
import { Input } from "smart-webcomponents-react/input";
import { Tree, TreeItem, TreeItemsGroup } from "smart-webcomponents-react/tree";
import { Scheduler } from "smart-webcomponents-react/scheduler";

import { ProgressBar } from "smart-webcomponents-react/progressbar";
import { Rating } from "smart-webcomponents-react/rating";

import axios from "axios";

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
      data: [],
    };

    this.calendarHandler = this.calendarHandler.bind(this);
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

  getCalendarData = () => {
    axios
      .get(`https://${process.env.host}/calendar/get_events`)
      .then((returned) => {
        this.calendarHandler(returned.data);
      });
  };

  calendarHandler = (calendarData) => {
    delete calendarData["_id"];
    delete calendarData["_rev"];

    let oldData = this.state.data;

    if (calendarData !== oldData) {
      this.setState({
        data: oldData.concat(calendarData.events),
      });
    }
  };

  refreshData(action, eventItem) {
    switch (action) {
      case "update":
        axios
          .post(`https://${process.env.host}/calendar/update_event`, {
            eventData: eventItem.item,
            eventTitle: eventItem.item.label,
          })
          .then(function (result) {
            console.log(`Axios update: ${result}`);
          });
        break;

      case "insert":
        axios
          .post(`https://${process.env.host}/calendar/insert_event`, {
            eventData: eventItem.item,
            eventTitle: eventItem.item.label,
          })
          .then(function (result) {
            console.log(`Axios insert: ${result}`);
          });

        break;

      case "delete":
        axios
          .post(`https://${process.env.host}/calendar/delete_event`, {
            eventData: eventItem.item,
            eventTitle: eventItem.item.label,
          })
          .then(function (result) {
            console.log(`Axios insert: ${result}`);
          });

        break;

      default:
        console.log(JSON.stringify(`Default:`, null, 2));
        break;
    }

    setTimeout(this.getCalendarData, 3000);
  }

  handleItemUpdate = (event) => {
    this.refreshData("update", event.detail);

    console.log(`ITEM UPDATE:${JSON.stringify(event.detail, null, 2)}`);
  };

  handleItemRemove = (event) => {
    this.refreshData("delete", event.detail);
  };

  handleItemInsert = (event) => {
    this.refreshData("insert", event.detail);

    console.log(`Event: ${JSON.stringify(event.detail, null, 2)}`);
  };

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
  };

  componentDidUpdate(prevProps) {
    /*
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      if (this.props.isLoggedIn === true) {
        setTimeout(this.getCalendarData, 3000);
      }
    }
    */
  }

  componentDidMount() {
    //setInterval(this.getCalendarData, 20000);
    this.getCalendarData();

    const scheduler = document.querySelector('smart-scheduler');
    
    scheduler.addEventListener("editDialogOpen", function (event) {
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

      dateStartEditor.querySelector(".smart-element").disabled = true;
      dateEndEditor.querySelector(".smart-element").disabled = true;

      repeatEditor.classList.add("smart-hidden");
      allDayEditor.classList.add("smart-hidden");

      labelEditor.querySelector(".smart-element").placeholder =
        "Enter a label...";

      descriptionEditor.querySelector(".smart-element").placeholder =
        "Enter a description for the event..";

      //Rating Element
      let ratingElement = editorsContainer.querySelector("#eventRating");

      if (!ratingElement) {
        const elementContainer = document.createElement("div"),
          label = document.createElement("label");

        label.textContent = "Rating: ";

        elementContainer.classList.add("smart-scheduler-window-editor");
        elementContainer.appendChild(label);

        ratingElement = document.createElement("smart-rating");
        ratingElement.id = "eventRating";
        ratingElement.disabled = false;
        ratingElement.rating = 4;
        ratingElement.max = 4;

        elementContainer.append(ratingElement);
        editorsContainer.appendChild(elementContainer);
      }


      //ProgressBar
      let progressElement = editorsContainer.querySelector("#eventProgress");

      if (!progressElement) {
        const elementContainer = document.createElement("div"),
          label = document.createElement("label");

        label.textContent = "Progress: ";

        elementContainer.classList.add("smart-scheduler-window-editor");
        elementContainer.appendChild(label);

        progressElement = document.createElement("smart-progress-bar");
        progressElement.id = "eventProgress";
        progressElement.showProgressValue = true;

        elementContainer.appendChild(progressElement);

        editorsContainer.appendChild(elementContainer);
      }

      progressElement.value = schedulerEvent.progress || 4;
    });
  }

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

                  <Button id="addNew" onClick={this.addNew.bind(this)}>
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
                    ></Scheduler>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Calendar1;
