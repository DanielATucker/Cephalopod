import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class RegisterAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "username": null,
      "password": null,
      "password2": null,
      "is_loggedin": "Not logged in"
    }
  };

  async submit() {
    if (this.state.password === this.state.password2) {
      console.log(`Passwords good`)

      fetch(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/system/register_admin`, {
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
      }).then(function(response) {
        console.log(`Response: ${JSON.stringify(response, null, 2)}`);
      })
    } else {
      console.log(`Passwords not good`);
    };
  };

  async doesUserExist() {
    let is_loggedin = await fetch(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/system/is_loggedin`, {credentials: "include"}, {
      method: 'GET',
    });
    
    let is_loggedinBack = await is_loggedin.json();

    console.log(`is_loggedinBack ${JSON.stringify(is_loggedinBack, null, 2)}`);

    this.setState({
      "is_loggedin": is_loggedinBack.username
    })

    setTimeout(() => {
      console.log(`is_loggedin: ${this.state.is_loggedin}`);
    }, 3000);
  }

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

  password2Change(password2){
    if (! (this.state.password2 === password2.target.value)) {
      this.setState({
        "password2": password2.target.value
      })
    }
  };

  componentDidUpdate(prevState) {
    if (this.state !== prevState) {
      setTimeout(() => {
        this.doesUserExist();
      }, 1000);
    };
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                
                <h4>Cephalopod Admin Register</h4>
                
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3"
                onSubmit={(e)=> {
                  this.submit();
                }}
                >
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" 
                    onChange={this.usernameChange.bind(this)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"
                    onChange={this.passwordChange.bind(this)}
                   />
                  </div>

                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword2" placeholder="Confirm Password"
                    onChange={this.password2Change.bind(this)}
                   />
                  </div>

                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login_admin" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterAdmin
