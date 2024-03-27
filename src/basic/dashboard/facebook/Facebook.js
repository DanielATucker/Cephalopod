import { Button, Card, CardContent } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react';
import { FacebookProvider, Login, Status } from 'react-facebook-w';

export default class Facebook extends Component {
  constructor() {
    super();

    this.state = {
      isFacebookLoggedIn: false
    }
  }

  handleResponse = (data) => {
    axios
      .put(`https://${process.env.host}/socials/token_in`, {
        token: data.tokenDetail.accessToken,
        user_id: data.profile.id
      }, { withCredentials: true })
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result, null, 2)}`);

        this.props.isToken;
      })
      .then(() => {
        this.getSocials();
      })
      .catch((err) => {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`)
      })
  }

  getSocials = () => {
    axios.get(`https://${process.env.host}/socials/out`, { withCredentials: true })
      .then((result) => {
        console.log(`Socials: ${JSON.stringify(result.data, null, 2)}`)
      })
      .catch((err) => {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`)
      })
  }

  handleError = (error) => {
    this.setState({ error });
  }

  renderLogin = () => {
    return (
      <Login
        scope="email"
        onCompleted={this.handleResponse}
        onError={this.handleError}
      >
        {({ loading, handleClick, error, data }) => (
          <Card variant='outlined'>
            <CardContent>
              <Button onClick={handleClick}>
                Facebook Login
              </Button>
              {loading && (
                <span>Loading...</span>
              )}
            </CardContent>
          </Card>
        )}
      </Login>
    )
  }

  componentDidMount() {
    //this.getSocials();
    this.props.isToken();
  }

  render() {
    return (
      <FacebookProvider appId={process.env.facebook_app_id}>
        <Status>
          {({ loading, loginStatus }) => {
            console.log(`Loading: ${JSON.stringify(loading, null, 2)}`);
            console.log(`Status: ${JSON.stringify(loginStatus, null, 2)}`);
          }}
        </Status>

        {!this.props.isFacebookLoggedIn && this.renderLogin()}
        {this.props.isFacebookLoggedIn && (
          <Card variant='outlined'>
            <CardContent>
              You are sucessfully logged into facebook
            </CardContent>
          </Card>
        )}
      </FacebookProvider>
    );
  }
}