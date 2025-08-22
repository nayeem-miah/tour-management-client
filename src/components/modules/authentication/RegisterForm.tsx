
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Password from "@/components/ui/Password"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"


const registerSchema = z
    .object({
        name: z.string().min(3, {
            message: "Username must be at least 3 characters.",
        }),
        email: z.email(),
        password: z.string().min(8, {
            message: "Password is too short minimum 8 character"
        }),
        confirmPassword: z.string().min(8, {
            message: "confirm password is too short character"
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"]
    })


export function RegisterForm() {

    const [register] = useRegisterMutation()


    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""

        }
    });

    // const onSubmit : SubmitHandler<FieldValues>= (data) => {
    //     console.log(data);
    // }
    const onSubmit = async (data: z.infer<typeof registerSchema>) => {

        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        try {
            const result = await register(userInfo).unwrap();
            console.log(result);
            toast.success("user created successfully ✅")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">create a new account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create a new  account
                </p>
            </div>
            <div className="grid gap-6 mt-3">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* username */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your privet display password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* confirm password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>confirm Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your privet confirm password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </form>
                </Form>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-background text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>

            </div>
            <div className="text-center text-sm">
                Already have an account?
                <Link to={"/login"} className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </div>
    )
}
