import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionInfo) => ({
                url: "/division/create",
                method: "POST",
                data: divisionInfo
            }),
            invalidatesTags: ["DIVISION"]
        }),

        getDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET"
            }),
            providesTags: ["DIVISION"],
            transformResponse: (response) => response.data
        }),


    })
})

export const {
    useAddDivisionMutation,
    useGetDivisionQuery
} = tourApi