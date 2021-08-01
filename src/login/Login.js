import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import LoginForm from './LoginFrom';
import RegisterForm from './RegisterForm';
import "../common/login.css";

const routes = [
  { path: '/', name: 'LoginForm', Component: LoginForm },
  { path: '/login', name: 'LoginForm', Component: LoginForm },
  { path: '/signup', name: 'RegisterForm', Component: RegisterForm }
]

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
    </BrowserRouter>
  )
}

export default Login;
