import { useReactiveVar } from "@apollo/client"
import React from "react"
import { Link } from "react-router-dom"
import { isLoggedInVar } from "../apollo"
// import Logo from "../images/logo.svg"

export const Header: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  return (
    <header className="py-4">
      <div
        className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center"
        style={{ borderBottom: "1px solid #eee", paddingBottom: "20px" }}
      >
        <Link to="/">
          <h1>PCB market LOGO</h1>
        </Link>
        <span className="text-xs">
          <Link to="/freelancer">
            <span>프리렌서 가입</span>
          </Link>{" "}
          {!isLoggedIn && (
            <>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <Link to="/create-account">
                <span>회원가입</span>
              </Link>{" "}
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <Link to="/login">
                <span>로그인</span>
              </Link>
            </>
          )}
        </span>
      </div>
    </header>
  )
}
