import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import LoginForm from './LoginFrom';
import RegisterForm from './RegisterForm';
import "../common/login.css";
// import _403 from './_403';
// import _404 from '../_404';

const routes = [
  { path: '/', name: 'LoginForm', Component: LoginForm },
  { path: '/login', name: 'LoginForm', Component: LoginForm },
  { path: '/signup', name: 'RegisterForm', Component: RegisterForm },
];

function Login() {

  return (
    <BrowserRouter>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition in={match != null} timeout={400} classNames="form" unmountOnExit>
              <Component />
            </CSSTransition>
          )}
        </Route>

      ))}
      {/* <Switch>
        <Route path='/login/*' component={_404} />
        <Route path='/signup/*' component={_404} />
      </Switch> */}
    </BrowserRouter>
  )
}

export default Login;
