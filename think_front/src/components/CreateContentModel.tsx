import { useRef, useState } from "react";
import { Button } from "./Button";
import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// Controlled Component
export function CreateContentModel({ open, onClose }: { open: boolean; onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        onClose();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-lg transform transition-all">
                {/* Close Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        aria-label="Close modal"
                    >
                        <CrossIcon />
                    </button>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    Add New Content
                </h2>

                {/* Input Fields */}
                <div className="space-y-4 mt-4">
                    <Input reference={titleRef} placeholder="Title" className="w-full" />
                    <Input reference={linkRef} placeholder="Link" className="w-full" />
                </div>

                {/* Content Type Selection */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Type</h3>
                    <div className="flex gap-2 mt-2 justify-center">
                        <Button
                            text="YouTube"
                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Youtube)}
                        />
                        <Button
                            text="Twitter"
                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Twitter)}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                    <Button onClick={addContent} variant="primary" text="Submit" fullWidth />
                </div>
            </div>
        </div>
    );
}
