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
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddTourTypeModel() {

    const form = useForm();
    const [addTourTypes] = useAddTourTypeMutation();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await addTourTypes(data).unwrap();
            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            if (error.data.message) {
                toast.error(error.data.message);
            }
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add tour types</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add tour types</DialogTitle>
                    </DialogHeader>

                    {/* From */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <FormDescription>This is your tour types name.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    )
}
