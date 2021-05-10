import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Header } from "../components/header"
import { Index } from "../pages"
import { NotFound } from "../pages/404"
import { CreateAccount } from "../pages/create-account"
import { AddFreelancer } from "../pages/freelancer/add-freelancer"
import { SelectCategory } from "../pages/freelancer/select-category"
import { Login } from "../pages/login"

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/freelancer" exact>
          <SelectCategory />
        </Route>
        <Route path="/freelancer/:slug">
          <AddFreelancer />
        </Route>
        <Route path="/" exact>
          <Index />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
