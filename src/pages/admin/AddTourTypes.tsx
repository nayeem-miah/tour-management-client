import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModel } from "@/components/modules/admin/tourTypes/AddTourModel";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTourTypesMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddTourTypes() {
    const { data } = useGetTourTypesQuery(undefined);
    const [removeTourTypes] = useDeleteTourTypesMutation();

    const handleRemoveTourType = async (tourId: string) => {
        const toastId = toast.loading("removing..........")
        try {
            const res = await removeTourTypes(tourId).unwrap();
            console.log(res);
            if (res.statusCode === 200) {
                toast.success(res.message, { id: toastId })
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, { id: toastId })
        }
    }


    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Tour types </h1>
                <AddTourTypeModel />
            </div>
            {/* show all tour types */}
            <div className="border-muted border rounded-t-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">name</TableHead>

                            <TableHead className="text-right">action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item: { _id: string, name: string }) => (
                            <TableRow key={item._id} >
                                <TableCell className="font-medium w-full">{item?.name}</TableCell>
                                <TableCell className="ml-auto">

                                    <DeleteConfirmation
                                        onConfirm={() => handleRemoveTourType(item._id)}
                                    >
                                        <Button size={"sm"}>
                                            <Trash2 />
                                        </Button>

                                    </DeleteConfirmation>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}
