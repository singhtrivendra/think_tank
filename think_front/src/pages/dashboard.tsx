import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function DashBoard() {
    const [modelOpen, setModelOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const { contents, refresh } = useContent();
    const [typee, setType] = useState("All_Content");

    useEffect(() => {
        refresh();
    }, [modelOpen, typee]); // Ensure content updates when typee changes

    async function handleShare() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(shareUrl);
        } catch (error) {
            console.error("Error sharing content:", error);
            alert("Failed to generate shareable link.");
        }
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="md:block">
                <Sidebar typee={typee} setType={setType} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>

            {/* Main Content */}
            <div className={`p-6 w-full min-h-screen bg-gray-50 dark:bg-gray-900 border-l dark:border-gray-700 transition-all ease-in-out ${isOpen ? "ml-60" :"ml-0" }`}>
                <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />

                {/* Header */}
                <div className="flex justify-between items-center pb-6">
    <h1 className="text-2xl font-bold text-gray-900  pl-5 pt-2 dark:text-white">
        Your Content
    </h1>

    {/* Mobile View (Hidden on Medium and Larger Screens) */}
    <div className="flex gap-4 block md:hidden">
        <Button onClick={handleShare} variant="secondary" text="Share" startIcon={<ShareIcon />} />
        <Button onClick={() => setModelOpen(true)} variant="primary" text="Add" startIcon={<PlusIcon />} />
    </div>

    {/* Desktop View (Hidden on Small Screens) */}
    <div className="flex gap-4 hidden md:flex">
        <Button onClick={handleShare} variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
        <Button onClick={() => setModelOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
    </div>
</div>


                {/* Content Grid */}
                <div className={`grid grid-cols-1 ${isOpen ? "md:grid-cols-3" : "md:grid-cols-4"} gap-6`}>
                    {contents.filter(({ type }) => typee === "All_Content" || type === typee).length > 0 ? (
                        contents
                            .filter(({ type }) => typee === "All_Content" || type === typee)
                            .map(({ type, link, title, description }, index) => (
                                <Card key={index} title={title} link={link} type={type} description={description} />
                            ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
                            No content available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
