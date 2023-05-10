import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import * as dotenv from 'dotenv';


dotenv.config();


export class LoginAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "username": null,
      "password": null,
      "password2": null
    }

    this.doesUserExist = this.doesUserExist.bind(this);
  };

  usernameChange(username) {
    if (! (this.state.username === username.target.value)) {
      this.setState({
        "username": username.target.value
      })
    }
  };

  passwordChange(password) {
    if (! (this.state.password === password.target.value)) {
      this.setState({
        "password": password.target.value
      })
    }
  };

  async doesUserExist() {
    let is_loggedin = await fetch(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/system/is_loggedin`, {credentials: "include"}, {
      method: 'GET',
      mode: 'cors',  
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'credentials': "include"
      }
    });
    
    let is_loggedinBack = await is_loggedin.json();

    console.log(`is_loggedinBack ${JSON.stringify(is_loggedinBack.username, null, 2)}`);

    this.setState({
      "is_loggedin": is_loggedinBack.username
    });
  };

  async submit() {
    console.log(`Passwords good`)

    console.log(`username: ${this.state.username}`);

    fetch(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/system/login_admin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'credentials': "include"
      },
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password
      })
    }).catch(function (err) {
      console.log(`Error: ${err}`);
    });

    setTimeout(this.doesUserExist, 3000);
  };

  componentDidMount(prevState) {
    setTimeout(() => {
      this.doesUserExist();
    }, 3000);
  }

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

export default LoginAdmin