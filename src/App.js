import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Layout'
import AuthRoute from 'components/AuthRoute'
import history from 'utils/history'
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/home" component={Home}></Route> */}
          <AuthRoute path="/home" component={Home}></AuthRoute>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    )
  }
}
