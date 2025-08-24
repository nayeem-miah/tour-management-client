import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useSendOTPMutation, useVerifyOTPMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export default function Verify() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email] = useState(location.state)
    const [confirm, setConfirm] = useState(false);
    const [sendOtp] = useSendOTPMutation();
    const [verifyOTP] = useVerifyOTPMutation();
    const [timer, setTimer] = useState(120);




    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        }
    })

    const handleSendOtp = async () => {
        const toastId = toast.loading("sending OTP")

        try {
            const res = await sendOtp({ email: email }).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId })
                setConfirm(true)
                setTimer(5)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {

        const toastId = toast.loading("verify OTP")

        const userInfo = {
            email,
            otp: data.pin
        }

        try {
            const res = await verifyOTP(userInfo).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId })
                setConfirm(true)
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }




    // * needed but off for development
    // useEffect(() => {
    //     if (!email) {
    //         navigate("/")
    //     }
    // },
    //     [email]
    // )
    useEffect(() => {
        const timerId = setInterval(() => {

            if (!email || !confirm) {
                return;
            }
            if (email && confirm) {
                setTimer(prev => prev > 0 ? prev - 1 : 0)
                // console.log("timing");
            }
        }, 1000);

        return () => clearInterval(timerId)
    }, [confirm, email])

    return (
        <div className="grid place-content-center h-screen">
            {
                confirm ? (<Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Verify your email address</CardTitle>
                        <CardDescription>Please enter the 6 degit code we sent to <br />
                            {email}
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                id="otp-form"
                                onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>One-Time Password</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={1} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <Dot />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={4} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription>
                                                <Button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    variant={"link"}
                                                    disabled={timer !== 0}
                                                    className={cn("p-0 m-0", {
                                                        "cursor-pointer": timer === 0,
                                                        "text-gray-500": timer !== 0
                                                    })}
                                                >
                                                    Resent OTP {" "} {timer}
                                                </Button>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button form="otp-form" type="submit">Submit</Button>
                    </CardFooter>
                </Card>) : (<Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Verify your email address</CardTitle>
                        <CardDescription>We will send an OTP at <br />
                            {email}
                        </CardDescription>

                    </CardHeader>

                    <CardFooter className="flex justify-end">
                        <Button onClick={handleSendOtp} className="w-[300px]">Confirm</Button>
                    </CardFooter>
                </Card>)
            }
        </div>
    )
}
