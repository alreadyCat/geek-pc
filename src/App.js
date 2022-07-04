import React, { Component, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'
const Login = React.lazy(() => import('./pages/Login'))
const Home = React.lazy(() => import('./pages/Layout'))
// import Login from './pages/Login'
// import Home from './pages/Layout'
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            {/* <Route path="/home" component={Home}></Route> */}
            <Redirect from="/" to="/home" exact></Redirect>
            <AuthRoute path="/home" component={Home}></AuthRoute>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Suspense>
      </Router>
    )
  }
}
