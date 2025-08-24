import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "./axiosBaseQuery"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({

    })
})


// //  not use axios
// export const baseApi = createApi({
//     reducerPath: "baseApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://localhost:3000",
//         credentials : "include"
//     }),
//     endpoints: () => ({

//     })
// })