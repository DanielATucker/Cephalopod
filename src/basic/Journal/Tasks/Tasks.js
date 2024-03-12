import React, { Component } from "react";

import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView'; () => { }
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`https://${process.env.host}/tasks/out`, {
        withCredentials: true
      })
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result.data, null, 2)}`);
        this.props.setTaskList(result.data);
      });
  };

  renderTaskList = () => {
    return Object.values(this.props.taskList).map((task) => {
      return (
        <TreeItem
          key={task.id}
          nodeId={task.id}
          label={task.name}
        >
          <Card>
            <CardContent>
              <Button onClick={(event) => {
                this.props.subTaskSubmit(task);
              }}>
                Add Subtask
              </Button>

              <TextField
                onChange={(event) => {
                  this.props.newSubTaskNameChange(event.target.value);
                }}
              />
            </CardContent>
          </Card>
        </TreeItem>
      );
    });
  }


  render() {
    return (
      <>
        <Card variant="outlined">
          <CardContent>
            <h1>Tasks</h1>

            <Card>
              <CardContent>
                <Button onClick={(event) => {
                  this.props.submit();
                }}>
                  Add New Task
                </Button>

                <TextField
                  onChange={(event) => {
                    this.props.newTaskNameChange(event.target.value);
                  }}
                />
              </CardContent>
            </Card>

            <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
              <TreeView
                aria-label="Current Tasks"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >

                {this.renderTaskList()}
              </TreeView>
            </Box>

          </CardContent>
        </Card>
      </>
    );
  }
}
