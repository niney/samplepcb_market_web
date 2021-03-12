import { gql, useMutation } from "@apollo/client"
import React from "react"
import { useForm } from "react-hook-form"
import { FormError } from "../components/form-error"

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

const onCompleted = (data: any) => {
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
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>()
  const [loginMutation, { data }] = useMutation(LOGIN_MUTATION, {
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

  console.log(data)

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-5 px-5"
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
          <button className="mt-3 btn">Log In</button>
        </form>
      </div>
    </div>
  )
}
