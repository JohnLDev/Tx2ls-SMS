// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import BarCode from '../pages/dashboard'

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={BarCode} />
    <Redirect to='/' />
  </Switch>
)

export default Routes
