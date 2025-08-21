import { RegisterForm } from "@/components/modules/authentication/RegisterForm"
import registerImage from "../assets/images/travel-register.jpg"

export default function Register() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* image */}

            <div className="bg-muted relative hidden lg:block">
                <img
                    src={registerImage}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover "
                />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <RegisterForm />
                    </div>
                </div>
            </div>

        </div>
    )
}
