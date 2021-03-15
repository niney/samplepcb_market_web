import React from "react"
import { isLoggedInVar } from "../apollo"
import {
  BrowserRouter as Router,
  Redirect,
  // Route,
  Switch,
} from "react-router-dom"
import { Header } from "../components/header"
import { useMe } from "../hooks/useMe"
import { LOCALSTORAGE_TOKEN } from "../constants"

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe()

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    )
  }
  // return (
  //   <div>
  //     <h1>{data.me.userId + " | " + data.me.name}</h1>
  //     <button onClick={() => isLoggedInVar(false)}>Log Out</button>
  //   </div>
  // )
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Redirect to="/" />
        </Switch>
      </Router>
      <div>
        <h1>{data.me.userId + " | " + data.me.name}</h1>
        <button
          onClick={() => {
            isLoggedInVar(false)
            localStorage.removeItem(LOCALSTORAGE_TOKEN)
          }}
        >
          Log Out
        </button>
      </div>
    </>
  )
}
