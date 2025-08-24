import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Password from "@/components/ui/Password"
import config from "@/config"
import { cn } from "@/lib/utils"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, {
        message: "minimum password must be 8 characters"
    })
})

export function LoginForm() {
    const [login] = useLoginMutation();
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {


        try {
            const res = await login(data).unwrap();

            if (res.success) {
                navigate("/")
            }

        } catch (error) {
            console.log(error);
            if (error.data || error.status === 500) {
                toast.error("Your account is not verified");
                navigate("/verify", { state: data.email })
            }

            if (error.data.message === "Invalid email or password") {
                toast.error("Invalid credentials")
            }
        }
    }

    return (
        <div className={cn("flex flex-col gap-6")} >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>

            {/*  form  */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email"
                                        type="email"
                                        {...field} />
                                </FormControl>
                                <FormDescription>This is your email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* password field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormDescription>This is your Password.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        login
                    </Button>
                </form>
            </Form>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
            </div>
            <Button onClick={() => window.open(`${config.baseUrl}/auth/google`)} variant="outline" className="w-full">
                Login with Google
            </Button>


            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={"/register"} className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </div>
    )
}
