import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';


var CircularJSON = require('circular-json');

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const LoginAdmin = lazy(() => import('./user-pages/Login_admin'));

const Register1 = lazy(() => import('./user-pages/Register'));
const RegisterAdmin = lazy(() => import('./user-pages/Register_admin.js'));

const Home = lazy(() => import('./basic/Home.js'));
const Education = lazy(() => import('./basic/Education.js'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
        <Route exact path="/" component={ Home } />

          <Route path="/register/admin" component = { RegisterAdmin } />

          <Route path="/login/admin" component = { LoginAdmin } />

          <Route path="/dashboard" component={ Dashboard } />

          <Route path="/education" component={ Education } />

          <Route path="/basic-ui/buttons" component={ Buttons } />
          
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } />

          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  };
};

export default AppRoutes;