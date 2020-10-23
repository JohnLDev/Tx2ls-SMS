// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import ForgotPasswordPage from '../pages/forgot-password'
import Dashboard from '../pages/Dashboard'
import Sales from '../pages/sales'
import CreateNewUserPage from '../pages/NewUser'
import Inventory from '../pages/inventory'
import History from '../pages/history'
import Barcode from '../pages/barcode-generator/index'
import EnterpriseLoginPage from '../pages/EnterpriseLoginPage/index'
import EnterpriseRegisterPage from '../pages/EnterpriseRegisterPage'
import EnterpriseForgotPasswordPage from '../pages/EnterpriseForgotPassword/index'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={EnterpriseLoginPage} />
      <Route path='/newenterprise' exact component={EnterpriseRegisterPage} />
      <Route
        path='/forgotenterprise'
        exact
        component={EnterpriseForgotPasswordPage}
      />

      <Route path='/login' exact component={Login} />
      <Route path='/forgotpassword' exact component={ForgotPasswordPage} />
      <Route path='/dashboard' exact component={Dashboard} />
      <Route path='/sales' exact component={Sales} />
      <Route path='/newuser' exact component={CreateNewUserPage} />
      <Route path='/inventory' exact component={Inventory} />
      <Route path='/history' exact component={History} />
      <Route path='/barcode' exact component={Barcode} />

      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)

export default Routes
