import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { Button, Card, CardContent } from "@mui/material";
import axios from "axios";

import { io } from "socket.io-client";


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  submit = () => {
    console.log(`Submit`);

    let username = this.state.username;
    let password = this.state.password;

    console.log(`Data out`);

    axios.defaults.withCredentials = true;

    axios
      .post(`https://${process.env.host}/system/login`, {
        username: username,
        password: password,
      })
      .then((result) => {
        console.log(`Login update: ${JSON.stringify(result)}`);

        this.props.setIs_loggedin(result.data.is_loggedin);
        this.props.setUsername(result.data.username);
        this.props.setIs_admin(result.data.is_admin);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      }).then((resolve, reject) => {
        const socket = io(`https://${process.env.host}`, {
          withCredentials: true
        }, { resource: 'nodejs' });

        socket.on("connect", () => {
          console.log(`Socket Connected`);

          socket.emit("auth", ({
            username: username,
            password: password,
          }))
        })

        resolve()
      }).catch((err) => {
        console.log(`Error: ${err}`);
      })
  };

  usernameChange(event) {
    let username = event.target.value;
    if (username !== this.state.username) {
      this.setState({
        username: username,
      });
    }
  }

  passwordChange(event) {
    let password = event.target.value;

    if (password !== this.state.password) {
      this.setState({
        password: password,
      });
    }
  }

  render() {
    return (
      <div class="row-centered">
        <div class="row-centered">
          <Card variant="outlined">
            <CardContent>
              <div class="row-centered" style={{ maxWidth: 500 }}>
                <Card>
                  <CardContent>
                    <form class="row-centered">
                      <p> Log In</p>

                      <Form.Group>
                        <Form.Control
                          id="Inputusername"
                          placeholder="Username"
                          onChange={this.usernameChange.bind(this)}
                        />
                      </Form.Group>
                      <br />

                      <Form.Group>
                        <Form.Control
                          type="password"
                          id="InputPassword"
                          placeholder="Password"
                          onChange={this.passwordChange.bind(this)}
                        />
                      </Form.Group>
                      <br />

                      <div class="row-centered">
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            console.log("Clicked!");
                            this.submit();
                          }}
                          type="button"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
