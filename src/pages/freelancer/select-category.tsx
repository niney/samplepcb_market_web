import { gql, useQuery } from "@apollo/client"
import React from "react"
import { Link } from "react-router-dom"

const CATEGORIES_QUERY = gql`
  query categories($input: CategoriesInput!) {
    categories(input: $input) {
      ok
      error
      categories {
        name
        slug
        order
      }
    }
  }
`

export const SelectCategory = () => {
  const { data, loading } = useQuery(CATEGORIES_QUERY, {
    variables: {
      input: {
        parent: 0,
      },
    },
  })

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div>작업가능한 분야를 선택 해주세요</div>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-24">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.categories.categories?.map(
              (category: any, index: number) => (
                <Link key={index} to={`/freelancer/${category.slug}`}>
                  <div className="flex flex-col group items-center cursor-pointer w-64">
                    <div
                      style={{ backgroundImage: `url(${category.coverImg})` }}
                      className="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                    ></div>
                    <span className="mt-1 text-sm text-center font-medium">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
