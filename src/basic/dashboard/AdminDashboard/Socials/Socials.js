import React, { Component } from "react";

import { Button, Card, CardContent, TextField } from "@mui/material";
import Facebook from "../../facebook/Facebook.js";
import axios from "axios";

export default class Socials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socials: {},
      isFacebookLoggedIn: false
    };
  }

  submitPage = (name, id, access_token) => {
    axios
      .put(`https://${process.env.host}/socials/submit_page`, {
        name: name,
        id: id,
        token: access_token
      }, { withCredentials: true })
      .then((result) => {
        console.log(`Result: ${result.data}`)
        this.props.getSocials()
      })
  }

  isToken = () => {
    axios
      .get(`https://${process.env.host}/socials/is_token`, { withCredentials: true })
      .then((result) => {
        console.log(`Result: ${result.data}`)

        if (result.data === "Token Expired, Log in Again") {
          console.log("Token Expired, Log in Again");
          this.setState({ isFacebookLoggedIn: null })
        } else if (result.data === "No Token") {
          console.log(`No Token`)
          this.setState({ isFacebookLoggedIn: null })
        } else if (result.data === "Token Updated") {
          console.log(`Token Updated`)
          this.setState({ isFacebookLoggedIn: true })
        }

        else if (result.data === "Token") {
          this.setState({
            isFacebookLoggedIn: true
          })
        }
      })
  }

  componentDidMount() {
    //this.props.getSocials();
    this.isToken();
  }

  renderSocialSearchResult = (result) => {
    result.map((feed) => {
      return (
        <Card>
          <CardContent>
            <h4>{feed.name}</h4> <br />

            <Button
              onClick={() => {
                this.submitPage(feed.name, feed.id, feed.access_token)
              }}
            >

            </Button>
          </CardContent>
        </Card>
      )
    })
  }

  renderNewSocial = () => {
    return (
      <Card>
        <CardContent>
          <Button onClick={(event) => {
            this.props.addNewSocial(this.props.newSocialName);
          }}>
            Add new Facebook Feed
          </Button>

        </CardContent>
      </Card>
    )
  }

  renderSocials = () => {
    if (this.props.socials !== null) {
      return Object.values(this.props.socials).map((feed) => {
        console.log(`Feed: ${JSON.stringify(feed, null, 2)}`)
        return (
          <Card type="outlined">
            <CardContent>
              <p>
                name: {feed.name} <br />
                ID: {feed.id}<br />
                Added By: {feed.addedBy} <br />
              </p>
            </CardContent>
          </Card>
        )

      })
    }
    else {
      return (
        <Card type="outlined">
          <CardContent>
            No Socials added
          </CardContent>
        </Card>
      )
    }
  };

  render() {
    return (
      <>
        <Card>
          <CardContent>
            <h1>Socials</h1>

            <Facebook
              isFacebookLoggedIn={this.state.isFacebookLoggedIn}
              isToken={this.isToken}
            />

            {this.state.isFacebookLoggedIn && this.renderNewSocial()}
            {this.props.socialSearchResult && this.renderSocialSearchResult(this.props.socialSearchResult)}

            {this.renderSocials()}
          </CardContent>
        </Card>
      </>
    );
  }
}


/*
<TextField
            onChange={(event) => {
              this.props.newSocialNameChange(event.target.value);
            }}
          />
*/