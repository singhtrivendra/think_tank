import { useState, useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

// Define validation schema
const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        // Validate input using Zod
        const result = schema.safeParse({ username, password });

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            setErrors({
                username: formattedErrors.username?.[0],
                password: formattedErrors.password?.[0],
            });
            return;
        }

        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password,
            });
            alert("You have signed up!");
            navigate("/signin");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-sm p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                    Create an Account
                </h2>

                {/* Username Input */}
                <div className="w-full">
                    <Input
                        reference={usernameRef}
                        placeholder="Username"
                        className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary w-full"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Password Input with Eye Button */}
                <div className="relative w-full">
                    <Input
                        reference={passwordRef}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary w-full pr-10"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center space-y-3">
                    <Button
                        onClick={signup}
                        loading={false}
                        variant="primary"
                        text="Sign Up"
                        fullWidth={true}
                        className="w-full"
                    />

                    <button
                        onClick={() => navigate("/signin")}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                        Already have an account? Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}
