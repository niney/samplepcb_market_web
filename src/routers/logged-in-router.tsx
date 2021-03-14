import { gql, useQuery } from "@apollo/client"
import React from "react"
import { isLoggedInVar } from "../apollo"
import { meQuery } from "../__generated__/meQuery"
// import {
//   BrowserRouter as Router,
//   Redirect,
//   Route,
//   Switch,
// } from "react-router-dom"

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      userId
      name
    }
  }
`

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY)

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    )
  }
  return (
    <div>
      <h1>{data.me.userId + " | " + data.me.name}</h1>
      <button onClick={() => isLoggedInVar(false)}>Log Out</button>
    </div>
  )
}
