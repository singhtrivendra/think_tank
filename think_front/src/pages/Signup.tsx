import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

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
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 min-w-[320px] p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">Create an Account</h2>
                
                <Input reference={usernameRef} placeholder="Username" className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary" />
                <Input reference={passwordRef} placeholder="Password" type="password" className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-primary" />
                
                <div className="flex flex-col items-center space-y-3">
                    <Button onClick={signup} loading={false} variant="primary" text="Sign Up" fullWidth={true}  />
                    
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
