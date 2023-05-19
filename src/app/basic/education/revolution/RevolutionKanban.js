import React, { Component } from "react";

import { Kanban } from "smart-webcomponents-react/kanban";

export class RevolutionKanban extends Component {
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

  render() {
    let kanbanColumns = this.state.columns;

    let kanbanDataSource = this.state.data;

    return (
      <div>
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
      </div>
    );
  }
}

export default RevolutionKanban;
