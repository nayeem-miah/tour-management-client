
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const registerSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.email(),
    password: z.string().min(8, {
        message: "Password is too short minimum 8 character"
    }),
    confirmPassword: z.string().min(8, {
        message: "confirm password is too short character"
    }),
})


export function RegisterForm() {

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""

        }
    });

    // const onSubmit : SubmitHandler<FieldValues>= (data) => {
    //     console.log(data);
    // }
    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        console.log(data);
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
                {/* <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                </div> */}


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* username */}
                        <FormField
                            control={form.control}
                            name="username"
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
                                        <Input
                                            placeholder="*******"
                                            type="password"
                                            {...field}
                                        />
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
                                        <Input
                                            placeholder="*******"
                                            {...field}
                                            type="password"
                                        />
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
