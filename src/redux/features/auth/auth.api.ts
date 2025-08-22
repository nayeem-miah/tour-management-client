import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (loginInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: loginInfo
            })
        }),

        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),


    })
})

export const {
    useRegisterMutation,
    useLoginMutation

} = authApi