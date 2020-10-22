// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import ForgotPasswordPage from '../pages/forgot-password'
import Dashboard from '../pages/Dashboard'
import Sales from '../pages/sales'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/forgotpassword' exact component={ForgotPasswordPage} />

      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/sales' exact component={Sales} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)

export default Routes
