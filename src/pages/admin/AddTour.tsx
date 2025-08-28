
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

export default function AddTour() {
    const { data: tourDivisionData, isLoading: divisionLoading } = useGetDivisionQuery(undefined);
    const { data: tourTypesData, isLoading: tourTypeLoading } = useGetTourTypesQuery(undefined);

    const divisionOptions = tourDivisionData?.map((item: { _id: string, name: string }) => ({
        value: item._id,
        label: item.name
    }));

    const tourTypes = tourTypesData?.map((item: { _id: string, name: string }) => ({
        value: item._id,
        label: item.name
    }))


    console.log(divisionOptions);
    const form = useForm({
        defaultValues: {
            title: "",
            division: "",
            tourType: "",
            description: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        console.log(formData);
    }


    return (
        <div className="w-full max-w-4xl mx-auto px-5 mt-16">
            <Card >
                <CardHeader>
                    <CardTitle>Add new tour</CardTitle>
                    <CardDescription>Add a new tour system</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* From */}
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 " id="add-tour" >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="title"
                                                type="title"
                                                {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-5">
                                <FormField
                                    control={form.control}
                                    name="division"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>division</FormLabel>
                                            <Select
                                                disabled={divisionLoading}
                                                onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a division" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        divisionOptions?.map((item: {
                                                            value: string, label: string
                                                        }) => (
                                                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                                        ))
                                                    }

                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tourType"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>tourType</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={tourTypeLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a tour types" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        tourTypes?.map((item: {
                                                            value: string, label: string
                                                        }) => (
                                                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                                        ))
                                                    }

                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="description"

                                                {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />


                        </form>
                    </Form>
                    <Button className="" type="submit" form="add-tour">Submit</Button>
                </CardContent>
            </Card>
        </div>
    )
}
