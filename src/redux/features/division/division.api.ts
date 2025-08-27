import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionInfo) => ({
                url: "/division/create",
                method: "POST",
                data: divisionInfo
            })
        }),

        getDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET"
            })
        }),


    })
})

export const {
    useAddDivisionMutation,
    useGetDivisionQuery
} = tourApi