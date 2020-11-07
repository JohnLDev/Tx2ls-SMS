// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Redirect, BrowserRouter, Route } from 'react-router-dom'
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
import VerifyEmailPage from '../pages/VerifyEmailPage/index'
import EmployersListPage from '../pages/EmployersListPage'
import RedefinePasswordPage from '../pages/RedefinePasswordPage'
import RedefinePasswordEnterprisePage from '../pages/RedefinePasswordEnterprisePage'
import { UserRouter, SubUserRouter } from './Route'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={EnterpriseLoginPage} />
      <Route path='/newenterprise' exact component={EnterpriseRegisterPage} />
      <Route
        path='/verifyemail/:verify_Key'
        exact
        component={VerifyEmailPage}
      />
      <Route
        path='/forgotenterprise'
        exact
        component={EnterpriseForgotPasswordPage}
      />

      <Route path='/redefine-password' exact component={RedefinePasswordPage} />
      <Route
        path='/redefine-password-enterprise'
        exact
        component={RedefinePasswordEnterprisePage}
      />

      <UserRouter path='/login' exact component={Login} isPrivate={true} />
      <UserRouter
        path='/forgotpassword'
        isPrivate={true}
        exact
        component={ForgotPasswordPage}
      />
      <SubUserRouter
        path='/dashboard'
        isPrivate={true}
        exact
        component={Dashboard}
      />
      <SubUserRouter path='/sales' isPrivate={true} exact component={Sales} />
      <SubUserRouter
        path='/newuser'
        isPrivate={true}
        exact
        component={CreateNewUserPage}
      />
      <SubUserRouter
        path='/inventory'
        isPrivate={true}
        exact
        component={Inventory}
      />
      <SubUserRouter
        path='/history'
        isPrivate={true}
        exact
        component={History}
      />
      <SubUserRouter
        path='/barcode'
        isPrivate={true}
        exact
        component={Barcode}
      />

      <SubUserRouter
        path='/employers'
        isPrivate={true}
        exact
        component={EmployersListPage}
      />

      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)

export default Routes
