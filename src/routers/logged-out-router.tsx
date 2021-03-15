import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import { NotFound } from "../pages/404"
import { CreateAccount } from "../pages/create-account"
import { Login } from "../pages/login"

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
