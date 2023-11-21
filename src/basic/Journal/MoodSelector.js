import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default class MoodSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  moodChange = (event) => {
    console.log(event.target.value);
  };

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Select Your Moods</h1>

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
          </CardContent>
        </Card>
      </>
    );
  }
}
