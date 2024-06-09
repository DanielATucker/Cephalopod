import { Card, CardContent, List } from "@mui/material";
import React, { Component } from "react";


import axios from "axios";

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: null,
    };

    this.getData = this.getData.bind(this);
  }

  async getData() {
    await axios
      .get(`https://${process.env.host}/library/all`)
      .then((returned) => {
        console.log(returned);

        let books = [];

        for (let book of returned.data) {
          let bookName = book.split("/");

          books.push(<li>{bookName}</li>);
        }
        this.setState({ bookList: books });
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <h4>Library</h4>
          <Card style={{overflow: "auto"}}>
            <CardContent>
              <p>Leftist Texts</p>

              <List>
              <ul>{this.state.bookList}</ul>
              </List>

            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }
}

export default Library;
