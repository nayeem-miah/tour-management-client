import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeInfo) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeInfo
            })
        }),

        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            transformResponse: (response) => response.data

        })

    })
})

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery
} = tourApi