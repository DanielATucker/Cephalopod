import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { Button } from "@mui/material";
import axios from "axios";

export class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      username: null,
      password: null,
      password2: null,
    };
  }

  submit = () => {
    console.log(`Submit`);

    if (this.state.password === this.state.password2) {
      let email = this.state.email;
      let username = this.state.username;
      let password = this.state.password;

      console.log(`Data out`);

      axios
        .post(`https://wade.leftistmediagroup.org/system/register_user`, {
          username: username,
          password: password,
        })
        .then((result) => {
          console.log(`Axios update: ${JSON.stringify(result)}`);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    } else {
      console.log("Passwords don't match, please try again.");
    }
  };

  usernameChange(event) {
    let username = event.target.value;

    console.log(`Username: ${username}`);

    if (username !== this.state.username) {
      this.setState({
        username: username,
      });
    }
  }

  emailChange(event) {
    let email = event.target.value;

    if (email !== this.state.email) {
      this.setState({
        email: email,
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

  password2Change(event) {
    let password2 = event.target.value;

    if (password2 !== this.state.password2) {
      this.setState({
        password2: password2,
      });
    }
  }

  render() {
    return (
      <div className="row-centered">
        <div className="page-header">
          <h4>Volunteering</h4>
          <h5>Sign up</h5>

          <p>
            Leftist Media Group is recruiting for volunteers to spread
            revolutionary propaganda.
          </p>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form>
                  <Form.Group>
                    <label htmlFor="InputEmail">Email</label>
                    <Form.Control
                      type="email"
                      id="InputEmail"
                      placeholder="Email"
                      onChange={this.emailChange.bind(this)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="InputUsername">Username</label>
                    <Form.Control
                      type="text"
                      id="InputUsername"
                      placeholder="Username"
                      onChange={this.usernameChange.bind(this)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <Form.Control
                      type="password"
                      id="InputPassword"
                      placeholder="Password"
                      onChange={this.passwordChange.bind(this)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="InputConfirmPassword">
                      Confirm Password
                    </label>
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="InputConfirmPassword"
                      placeholder="Password"
                      onChange={this.password2Change.bind(this)}
                    />
                  </Form.Group>

                  <br />

                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      console.log("Clicked!");
                      this.submit();
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
