
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useAddTourMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export default function AddTour() {
    const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
    const [addTour, { isLoading }] = useAddTourMutation();
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


    // console.log("multiple images", images);

    const form = useForm({
        defaultValues: {
            title: "",
            division: "",
            tourType: "",
            description: "",
            startDay: "",
            endDay: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const tourData = {
            ...data,
            startDay: formatISO(data.startDay),
            endDay: formatISO(data.endDay),
        }

        const formData = new FormData();

        formData.append("data", JSON.stringify(tourData))

        images.forEach(image => formData.append("files", image as File));

        // console.log(formData.get("files"));
        const toastId = toast.loading("loading........");
        try {
            const res = await addTour(formData).unwrap();
            console.log(res);
            if (res.success) {
                toast.success(res.message, { id: toastId });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.data.message, { id: toastId })
        }
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
                            <div className="flex gap-5">
                                <FormField
                                    control={form.control}
                                    name="startDay"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Date of birth</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date(
                                                                new Date().setDate(new Date().getDate() - 1)
                                                            )
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endDay"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>End date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={field.onChange}
                                                        captionLayout="dropdown"
                                                        disabled={(date) =>
                                                            date < new Date(
                                                                new Date().setDate(new Date().getDate() - 1)
                                                            )
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-5 items-stretch">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="description"
                                                    className="h-[250px]"
                                                    {...field} />
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />


                                <div className="flex-1 mt-6">
                                    <MultipleImageUploader onChange={setImages} />
                                </div>
                            </div>

                        </form>
                    </Form>
                    <Button disabled={isLoading} className="w-full mt-3" type="submit" form="add-tour">Submit</Button>
                </CardContent>
            </Card>
        </div>
    )
}
