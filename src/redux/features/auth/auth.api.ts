import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<null, ILogin>({
            query: (loginInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: loginInfo
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["USER"],
        }),

        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),

        sendOTP: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            })
        }),

        verifyOTP: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo
            })
        }),

        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ["USER"]
        })

    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useSendOTPMutation,
    useVerifyOTPMutation,
    useUserInfoQuery,
} = authApi