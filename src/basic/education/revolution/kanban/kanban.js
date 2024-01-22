import React, { Component } from "react";

import { Kanban } from "smart-webcomponents-react/kanban";

export class Kanban1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "1",
          status: "toDo",
          text: "Text",
          tags: "tags",
          progress: 90,
        },
      ],
      columns: [
        {
          label: "To do",
          dataField: "toDo",
        },
      ],
    };
  }

  taskAdd(event) {
    console.log(`Task Added: ${JSON.stringify(event.detail, null, 2)}`);

    fetch(
      `https://https://${process.env.host}:5001/Kanban/task_add`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: event.detail,
          eventTitle: event.detail.label,
        }),
        credentials: "include",
      }
    );
  }

  taskUpdate(event) {
    console.log(`Task Updated: ${JSON.stringify(event.detail, null, 2)}`);

    fetch(
      `https://https://${process.env.host}:5001/Kanban/task_update`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: event.detail,
        }),
        credentials: "include",
      }
    );
  }

  taskRemoved(event) {
    console.log(`Task Removed: ${JSON.stringify(event.detail, null, 2)}`);

    fetch(
      `https://https://${process.env.host}:5001/Kanban/task_remove`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: event.detail,
        }),
        credentials: "include",
      }
    );
  }

  columnAdd(event) {
    console.log(`Column Added: ${JSON.stringify(event.detail, null, 2)}`);

    fetch(
      `https://https://${process.env.host}:5001/Kanban/column_add`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: event.detail,
        }),
        credentials: "include",
      }
    );
  }

  columnUpdate(event) {
    console.log(`Column Updated: ${JSON.stringify(event.detail, null, 2)}`);

    fetch(
      `https://https://${process.env.host}:5001/Kanban/column_update`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: event.detail,
        }),
        credentials: "include",
      }
    );
  }

  columnRemoved(event) {
    console.log(`Column Removed: ${JSON.stringify(event.detail, null, 2)}`);

    fetch(
      `https://https://${process.env.host}:5001/Kanban/column_removed`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: event.detail,
        }),
        credentials: "include",
      }
    );
  }

  render() {
    let kanbanColumns = this.state.columns;

    let kanbanDataSource = this.state.data;

    return (
      <Kanban
        columns={kanbanColumns}
        dataSource={kanbanDataSource}
        collapsible
        allowDrag={true}
        allowDrop={true}
        editable={true}
        addNewColumn={true}
        addNewButton={true}
        applyColumnColorToTasks={true}
        columnColors={true}
        columnFooter={true}
        columnSummary={true}
        storeHistory={true}
        taskActions={true}
        taskComments={true}
        taskDue={true}
        taskPriority={true}
        taskProgress={true}
        taskSubTasks={"onePerRow"}
        taskTags={true}
        priorityList={true}
        onTaskAdd={this.taskAdd}
        onTaskUpdate={this.taskUpdate}
        onTaskRemove={this.taskRemoved}
        onColumnAdd={this.columnAdd}
        onColumnUpdate={this.columnUpdate}
        onColumnRemove={this.columnRemove}
      ></Kanban>
    );
  }
}

export default Kanban1;
