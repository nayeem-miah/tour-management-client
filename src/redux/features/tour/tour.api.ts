import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation({
            query: (tourTypeInfo) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeInfo
            }),
            invalidatesTags: ["TOUR"]
        }),

        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            providesTags: ["TOUR"],
            transformResponse: (response) => response.data
        }),

        deleteTourTypes: builder.mutation({
            query: (tourId) => ({
                url: `/tour/tour-types/${tourId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TOUR"]
        })

    })
})

export const {
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useDeleteTourTypesMutation
} = tourApi