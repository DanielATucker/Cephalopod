import React, { Component } from "react";

import { Button, Card, CardContent } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
axios.defaults.withCredentials = true;


export default class MoodSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempMoods: {
        Anxiety: null,
        Depression: null,
        Mood: null,
        Energy: null,
      },
    };
  }

  submit = () => {
    let data = this.state.tempMoods;

    console.log(`Submit ${JSON.stringify(data, null, 2)}`);

    axios
      .post(`http://localhost:5001/moodchart/in`, {
        data: data,
      })
      .then((result) => {
        console.log(`MoodChart update: ${JSON.stringify(result)}`);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  moodChange = (event) => {
    let data = event.target.value;

    let tempMoodsIn = this.state.tempMoods;

    tempMoodsIn[data[0]] = data[1];

    this.setState({ tempMoods: tempMoodsIn });

    console.log(`State: ${JSON.stringify(this.state, null, 2)}`);
  };

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Select Your Moods</h1>

            <div class="row">
              <div class="col">
                <FormControl fullWidth>
                  <InputLabel>Anxiety</InputLabel>
                  <Select label="Anxiety" onChange={this.moodChange}>
                    <MenuItem value={["Anxiety", 1]}>1</MenuItem>
                    <MenuItem value={["Anxiety", 2]}>2</MenuItem>
                    <MenuItem value={["Anxiety", 3]}>3</MenuItem>
                    <MenuItem value={["Anxiety", 4]}>4</MenuItem>
                    <MenuItem value={["Anxiety", 5]}>5</MenuItem>
                    <MenuItem value={["Anxiety", 6]}>6</MenuItem>
                    <MenuItem value={["Anxiety", 7]}>7</MenuItem>
                    <MenuItem value={["Anxiety", 8]}>8</MenuItem>
                    <MenuItem value={["Anxiety", 9]}>9</MenuItem>
                    <MenuItem value={["Anxiety", 10]}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div class="col">
                <FormControl fullWidth>
                  <InputLabel>Depression</InputLabel>
                  <Select label="Depression" onChange={this.moodChange}>
                    <MenuItem value={["Depression", 1]}>1</MenuItem>
                    <MenuItem value={["Depression", 2]}>2</MenuItem>
                    <MenuItem value={["Depression", 3]}>3</MenuItem>
                    <MenuItem value={["Depression", 4]}>4</MenuItem>
                    <MenuItem value={["Depression", 5]}>5</MenuItem>
                    <MenuItem value={["Depression", 6]}>6</MenuItem>
                    <MenuItem value={["Depression", 7]}>7</MenuItem>
                    <MenuItem value={["Depression", 8]}>8</MenuItem>
                    <MenuItem value={["Depression", 9]}>9</MenuItem>
                    <MenuItem value={["Depression", 10]}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div class="col">
                <FormControl fullWidth>
                  <InputLabel>Mood</InputLabel>
                  <Select label="Mood" onChange={this.moodChange}>
                    <MenuItem value={["Mood", 1]}>1</MenuItem>
                    <MenuItem value={["Mood", 2]}>2</MenuItem>
                    <MenuItem value={["Mood", 3]}>3</MenuItem>
                    <MenuItem value={["Mood", 4]}>4</MenuItem>
                    <MenuItem value={["Mood", 5]}>5</MenuItem>
                    <MenuItem value={["Mood", 6]}>6</MenuItem>
                    <MenuItem value={["Mood", 7]}>7</MenuItem>
                    <MenuItem value={["Mood", 8]}>8</MenuItem>
                    <MenuItem value={["Mood", 9]}>9</MenuItem>
                    <MenuItem value={["Mood", 10]}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div class="col">
                <FormControl fullWidth>
                  <InputLabel>Energy</InputLabel>
                  <Select label="Energy" onChange={this.moodChange}>
                    <MenuItem value={["Energy", 1]}>1</MenuItem>
                    <MenuItem value={["Energy", 2]}>2</MenuItem>
                    <MenuItem value={["Energy", 3]}>3</MenuItem>
                    <MenuItem value={["Energy", 4]}>4</MenuItem>
                    <MenuItem value={["Energy", 5]}>5</MenuItem>
                    <MenuItem value={["Energy", 6]}>6</MenuItem>
                    <MenuItem value={["Energy", 7]}>7</MenuItem>
                    <MenuItem value={["Energy", 8]}>8</MenuItem>
                    <MenuItem value={["Energy", 9]}>9</MenuItem>
                    <MenuItem value={["Energy", 10]}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <br />

            <Button onClick={this.submit}>Submit</Button>
          </CardContent>
        </Card>
      </>
    );
  }
}
