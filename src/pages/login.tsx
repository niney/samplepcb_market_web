import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Button } from "../components/button"
import { FormError } from "../components/form-error"
import Logo from "../images/logo.svg"
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation"
import { Helmet } from "react-helmet"

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`

interface ILoginForm {
  userId: string
  password: string
}

const onCompleted = (data: loginMutation) => {
  const {
    login: { ok, token },
  } = data
  if (ok && token) {
    console.log(ok, token)
    // localStorage.setItem(LOCALSTORAGE_TOKEN, token)
    // authTokenVar(token)
    // isLoggedInVar(true)
  }
}

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  })
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  })
  const onSubmit = () => {
    const { userId, password } = getValues()
    loginMutation({
      variables: {
        loginInput: {
          userId,
          password,
        },
      },
    })
  }

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | PCB 재능마켓</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={Logo} className="w-52 mb-10" alt="" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            ref={register({ required: "UserId is required" })}
            name="userId"
            required
            type="input"
            placeholder="USER ID"
            className="input"
          />
          {errors.userId?.message && (
            <FormError errorMessage={errors.userId?.message} />
          )}
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="PASSWORD"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log in"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to 재능마켓?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  )
}
