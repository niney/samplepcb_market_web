import { gql, useMutation } from "@apollo/client"
import React from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link, useHistory } from "react-router-dom"
import { Button } from "../components/button"
import { FormError } from "../components/form-error"
// import Logo from "../images/logo.svg"
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation"

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`

interface ICreateAccountForm {
  userId: string
  name: string
  password: string
  phone: string
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
  })

  const history = useHistory()

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data
    if (ok) {
      alert("Account Created! Log in now!")
      history.push("/login")
    }
  }

  const [
    creatAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    },
  )
  const onSubmit = () => {
    if (!loading) {
      const { userId, name, password, phone } = getValues()

      creatAccountMutation({
        variables: {
          createAccountInput: { userId, name, password, phone },
        },
      })
    }
  }
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | PCB 재능마켓</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        {/* <img src={Logo} className="w-52 mb-10" alt="" /> */}
        <h1>회원가입</h1>
        <div className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </div>
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
            ref={register({ required: "UserId is required" })}
            name="name"
            required
            type="input"
            placeholder="이름"
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
          <input
            ref={register({ required: "UserId is required" })}
            name="phone"
            required
            type="input"
            placeholder="휴대폰번호"
            className="input"
          />
          {errors.userId?.message && (
            <FormError errorMessage={errors.userId?.message} />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  )
}
