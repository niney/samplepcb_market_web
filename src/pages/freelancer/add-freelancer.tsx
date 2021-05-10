import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { useHistory, useParams } from "react-router"
import { isLoggedInVar } from "../../apollo"
import { FormError } from "../../components/form-error"

const TOTAL = 2

const CATEGORIES_QUERY = gql`
  query categories($input: CategoriesInput!) {
    categories(input: $input) {
      ok
      error
      categories {
        id
        name
        slug
      }
    }
  }
`

const CREATE_FREELANCER_MUTATION = gql`
  mutation createFreelancerMutation(
    $createFreelancerInput: CreateFreelancerInput!
  ) {
    createFreelancer(input: $createFreelancerInput) {
      ok
      error
    }
  }
`

interface IAddFreelancerParams {
  slug: string
}

interface IAddFreelancerForm {
  userId?: string
  name?: string
  password?: string
  phone?: string
  sex: string
  career: string
}

export const AddFreelancer = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const params = useParams<IAddFreelancerParams>()
  const [step, setStep] = useState(1)
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const { data, loading } = useQuery(CATEGORIES_QUERY, {
    variables: {
      input: {
        slug: params.slug,
      },
    },
  })

  const history = useHistory()

  const {
    register,
    getValues,
    errors,
    handleSubmit,
  } = useForm<IAddFreelancerForm>({
    mode: "onChange",
  })

  const onNextStepClick = () => {
    if (step === 1 && checkedItems.length === 0) {
      alert("옵션을 선택해주세요.")
      return
    }

    if (step === TOTAL) {
      return
    }

    setStep((current) => current + 1)
  }
  const onPrevStepClick = () => setStep((current) => current - 1)

  const onCompleted = (data: any) => {
    const {
      createFreelancer: { ok },
    } = data
    if (ok) {
      alert("프리렌서 등록 완료")
      history.push("/login")
    } else {
      alert(ok.error)
      history.push("/")
    }
  }

  const [
    createFreelancerMutation,
    { loading: createLoading, data: createFreelancerMutationResult },
  ] = useMutation(CREATE_FREELANCER_MUTATION, {
    onCompleted,
  })

  const onSubmit = () => {
    if (!createLoading) {
      const { userId, name, password, phone, sex, career } = getValues()

      createFreelancerMutation({
        variables: {
          createFreelancerInput: {
            categoriesIds: checkedItems,
            sex,
            career,
            userId,
            name,
            password,
            phone,
          },
        },
      })
    }
  }

  useEffect(() => {
    if (step === 0) {
      history.push({
        pathname: "/freelancer",
      })
    }
  }, [history, step])

  const handleChange = (e: any) => {
    const item = e.target.name
    const isChecked = e.target.checked
    if (isChecked) {
      setCheckedItems(checkedItems.concat(+item))
    } else {
      setCheckedItems(checkedItems.filter((checked) => checked !== item))
    }
  }

  return (
    <div className="container flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>프리렌서 등록 : 샘플PCB마켓</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!loading && step === 1 && (
          <>
            <div>작업가능한 세부분야를 선택 해주세요 (복수선택가능)</div>
            <div className="max-w-screen-2xl pb-20 mx-auto mt-24">
              {data?.categories.categories?.map(
                (category: any, index: number) => (
                  <div className="mt-1" key={index}>
                    <label className="inline-flex items-center">
                      <input
                        name={category.id}
                        type="checkbox"
                        className="form-checkbox h-8 w-8"
                        onChange={handleChange}
                      />
                      <span className="ml-4 text-xl">{category.name}</span>
                    </label>
                  </div>
                ),
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>마지막으로 필수 정보를 입력해주세요.</div>
            <div className="max-w-screen-2xl pb-20 mx-auto mt-24">
              <div className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
                {!isLoggedIn && (
                  <input
                    ref={register({ required: "UserId is required" })}
                    name="userId"
                    required
                    type="input"
                    placeholder="USER ID"
                    className="input"
                  />
                )}
                {errors.userId?.message && (
                  <FormError errorMessage={errors.userId?.message} />
                )}
                {!isLoggedIn && (
                  <input
                    ref={register({ required: "Name is required" })}
                    name="name"
                    required
                    type="input"
                    placeholder="이름"
                    className="input"
                  />
                )}
                {errors.userId?.message && (
                  <FormError errorMessage={errors.userId?.message} />
                )}
                {!isLoggedIn && (
                  <input
                    ref={register({ required: "Password is required" })}
                    required
                    name="password"
                    type="password"
                    placeholder="PASSWORD"
                    className="input"
                  />
                )}
                {errors.password?.message && (
                  <FormError errorMessage={errors.password?.message} />
                )}
                {!isLoggedIn && (
                  <input
                    ref={register({ required: "Phone is required" })}
                    name="phone"
                    required
                    type="input"
                    placeholder="휴대폰번호"
                    className="input"
                  />
                )}
                {errors.phone?.message && (
                  <FormError errorMessage={errors.phone?.message} />
                )}
                <select
                  name="sex"
                  required
                  ref={register({ required: "sex is required" })}
                >
                  <option value="M">남자</option>
                  <option value="F">여자</option>
                </select>
                <select
                  name="career"
                  required
                  ref={register({ required: "career is required" })}
                >
                  <option value="">경력선택</option>
                  <option value="1년">1년</option>
                  <option value="2년">2년</option>
                  <option value="3년">3년</option>
                  <option value="4년">4년</option>
                  <option value="5년">5년</option>
                  <option value="6년">6년</option>
                  <option value="7년">7년</option>
                  <option value="8년">8년</option>
                  <option value="9년">9년</option>
                  <option value="10년">10년</option>
                  <option value="11년">11년</option>
                  <option value="12년">12년</option>
                  <option value="13년">13년</option>
                  <option value="14년">14년</option>
                  <option value="15년">15년</option>
                  <option value="16년">16년</option>
                  <option value="17년">17년</option>
                  <option value="18년">18년</option>
                  <option value="19년">19년</option>
                  <option value="20년">20년</option>
                  <option value="21년">21년</option>
                  <option value="22년">22년</option>
                  <option value="23년">23년</option>
                  <option value="24년">24년</option>
                  <option value="25년">25년</option>
                  <option value="26년">26년</option>
                  <option value="27년">27년</option>
                  <option value="28년">28년</option>
                  <option value="29년">29년</option>
                  <option value="30년">30년</option>
                  <option value="31년">31년</option>
                  <option value="32년">32년</option>
                  <option value="33년">33년</option>
                  <option value="34년">34년</option>
                  <option value="35년">35년</option>
                  <option value="36년">36년</option>
                  <option value="37년">37년</option>
                  <option value="38년">38년</option>
                  <option value="39년">39년</option>
                  <option value="40년">40년</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
          <button
            onClick={onPrevStepClick}
            className="focus:outline-none font-medium text-2xl"
          >
            이전
          </button>
          <div></div>
          <button
            type={step === TOTAL ? "submit" : "button"}
            onClick={onNextStepClick}
            className="focus:outline-none font-medium text-2xl"
          >
            {step === TOTAL ? "등록" : "다음"}
          </button>
          {createFreelancerMutationResult?.createFreelancer.error && (
            <FormError
              errorMessage={
                createFreelancerMutationResult.createFreelancer.error
              }
            />
          )}
        </div>
      </form>
    </div>
  )
}
