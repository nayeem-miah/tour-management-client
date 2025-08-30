import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";


export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation({
            query: (tourInfo) => ({
                url: "/tour/create",
                method: "POST",
                data: tourInfo
            }),
            invalidatesTags: ["TOUR"]
        }),
        getTours: builder.query<ITourPackage[], unknown>({
            query: (params) => ({
                url: "/tour",
                method: "GET",
                params: params,
            }),
            providesTags: ["TOUR"],
            transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
        }),
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
    useAddTourMutation,
    useAddTourTypeMutation,
    useGetTourTypesQuery,
    useDeleteTourTypesMutation,
    useGetToursQuery
} = tourApi