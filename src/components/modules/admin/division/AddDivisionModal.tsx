/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleImageUploader from "@/components/SingleImageUploader"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddDivisionModal() {
    const [addDivision] = useAddDivisionMutation();
    const [image, setImage] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

    // console.log("add division modal", image);

    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", image as File);


        // console.log(formData.get(data));
        const toastId = toast.loading("loading.......")

        try {

            const res = await addDivision(formData).unwrap();

            if (res.success) {
                toast.success(res.message, { id: toastId });
                setOpen(false)
            }
        } catch (error: any) {
            console.log(error)
            if (error.data.message) {
                toast.error(error.data.message, { id: toastId });
                setOpen(false)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="default">Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Division</DialogTitle>
                </DialogHeader>

                {/* From */}
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 " id="add-division" >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name"
                                            type="name"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>This is your tour division.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormDescription>This is your tour types name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </form>
                    <SingleImageUploader onChange={setImage} />

                </Form>
                <Button disabled={!image} type="submit" form="add-division">Submit</Button>
            </DialogContent>
        </Dialog>
    )
}
