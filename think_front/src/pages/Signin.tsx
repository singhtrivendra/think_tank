import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (error) {
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

                <Input 
                    reference={usernameRef} 
                    placeholder="Username" 
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary"
                />
                <Input 
                    reference={passwordRef} 
                    placeholder="Password" 
                    type="password" 
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary"
                />

                <div className="flex justify-center pt-4">
                    <Button 
                        onClick={signin} 
                        loading={false} 
                        variant="primary" 
                        text="Sign In" 
                        fullWidth={true} 
                    />
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
