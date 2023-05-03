import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';

import { allContext } from "./contexts.js";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      "Context": {
        "is_loggedin": "Not Initialized"
      }
    };
  };

  componentDidMount() {
    this.onRouteChanged();
  };

  setLogin(username) {
    this.setState({
      "is_loggedin": username
    });
  };

  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    
    return (
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          { navbarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <allContext.Provider value = {this.state.Context}>
                <AppRoutes/>
              </allContext.Provider>
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    };
  };

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    
    const body = document.querySelector('body');
    
    if(this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
    }
    else {
      body.classList.remove('rtl')
    };

    window.scrollTo(0, 0);
    
    const fullPageLayoutRoutes = ['/login', '/user-pages/login-2', '/register', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        });

        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        });

        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      };
    };
  };
};

export default (withRouter(App));