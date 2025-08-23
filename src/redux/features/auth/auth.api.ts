import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOtp, IVerifyOtp } from "@/types";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<null, ILogin>({
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
        })

    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendOTPMutation,
    useVerifyOTPMutation,

} = authApi