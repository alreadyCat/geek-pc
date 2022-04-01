import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Layout'
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    )
  }
}
