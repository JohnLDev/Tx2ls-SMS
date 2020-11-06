// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  RouteProps as ReactRouterProps,
  Route as ReactDomRouter,
  Redirect,
} from 'react-router-dom'

import { useAuth } from '../hooks/authContext'

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const UserRouter: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth()
  return (
    <ReactDomRouter
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }}
    />
  )
}

const SubUserRouter: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { subUser } = useAuth()
  return (
    <ReactDomRouter
      {...rest}
      render={() => {
        return isPrivate === !!subUser ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }}
    />
  )
}

export { UserRouter, SubUserRouter }
