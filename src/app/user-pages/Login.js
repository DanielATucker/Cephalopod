import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import * as dotenv from 'dotenv';
dotenv.config();


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "username": null,
      "password": null,
      "password2": null
    }

  };

  usernameChange(username) {
    this.setState({
      "username": username
    })
  };

  passwordChange(password) {
    this.setState({
      "password": password
    })
  };

  async submit() {
    if (this.state.password === this.state.password2) {
      console.log(`Passwords good`)

      const response = await fetch(`http://${process.env.host}:${process.env.host_port}/database/main`, {
        method: 'POST',
      });

      console.log(`Response: ${JSON.stringify(response, null, 2)}`);
    } else {
      console.log(`Passwords not good`);
    };
  };

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                
                <h4>Welcome to Cephalopod</h4>
                
                <h6 className="font-weight-light">Sign in to continue.</h6>
                
                <Form className="pt-3"
                  onSubmit={(e)=> {
                    e.preventDefault()
                    this.submit();
                  }}
                >
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                     type="text" placeholder="Username" size="lg" className="h-auto"
                     onChange={this.usernameChange.bind(this)}
                    />
                  </Form.Group>
                  
                  <Form.Group className="d-flex search-field">
                    <Form.Control 
                    type="password" placeholder="Password" size="lg" className="h-auto" 
                    onChange={this.passwordChange.bind(this)}
                    />
                  </Form.Group>
                  
                  <div className="mt-3">
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  </div>
                  
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                  </div>

                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login