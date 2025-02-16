import { useState, useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

// Define validation schema
const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);

    async function signin() {
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
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (error) {
            console.log(error)
            alert("Username or password not correct")
            console.error("Signin failed:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 w-full max-w-sm p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
                    Sign In
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Enter your credentials to access your account
                </p>

                {/* Username Input */}
                <div className="w-full">
                    <Input
                        reference={usernameRef}
                        placeholder="Username"
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Password Input with Eye Button */}
                <div className="relative w-full mt-4">
                    <Input
                        reference={passwordRef}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary pr-10"
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

                {/* Sign In Button */}
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true} />
                </div>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}
