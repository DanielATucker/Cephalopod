import { Button, Card, CardContent } from "@mui/material";
import React, { Component } from "react";

import { Dropdown } from "react-bootstrap";

export default class RSS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SongLibrary: [],
      urls: [],
      queue: [],
      RSSRaw: [],
    };
  }

  getFeed = () => {
    axios
      .get(`https://${process.env.host}/rss/get_rss`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(`Axios update: ${JSON.stringify(result, null, 2)}`);
        this.setState({ RSSRaw: result });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  componentDidMount() {
    this.getFeed();
  }

  render() {
    let feed = [];

    if (this.state.RSSRaw !== null) {
      feed = this.state.RSSRaw.map((story) => (
        <div class="col">
          <Card>
            <CardContent>
              <Card>
                <CardContent>
                  <h5>{story.Title}</h5>

                  <br />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      ));
    } else {
      feed = <p>Not Initialized Yet</p>;
    }

    return (
      <div class="container">
        <Card>
          <CardContent>
            <h1> RSS </h1>

            <div className="col">
              <Card>
                <CardContent>
                  <h4>Feed</h4>

                  <Card>
                    <CardContent>
                      <div class="row">{feed}</div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
