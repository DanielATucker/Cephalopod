import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { Button, Card, CardContent } from "@mui/material";
import axios from "axios";

export class Register_Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      password2: null,
    };
  }

  submit = () => {
    console.log(`Submit`);

    if (this.state.password === this.state.password2) {
      let email = this.state.email;
      let password = this.state.password;

      console.log(`Data out`);

      axios.defaults.withCredentials = true;

      axios
        .put(
          `https://${process.env.host}:5001/system/register_admin`,
          {
            password: password,
            email: email,
          },
          { withCredentials: true }
        )
        .then((result) => {
          console.log(`Axios update: ${JSON.stringify(result)}`);

          this.props.admin_created();
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    } else {
      console.log("Passwords don't match, please try again.");
    }
  };

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
        <div className="row-centered">
          <div className="row-centered" style={{ maxWidth: 500 }}>
            <Card>
              <CardContent>
                <h5>Register - Admin</h5>

                <form className="row-centered">
                  <Form.Group>
                    <Form.Control
                      type="email"
                      id="InputEmail"
                      placeholder="Email"
                      onChange={this.emailChange.bind(this)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control
                      type="password"
                      id="InputPassword"
                      placeholder="Password"
                      onChange={this.passwordChange.bind(this)}
                    />
                  </Form.Group>

                  <Form.Group>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Register_Admin;
