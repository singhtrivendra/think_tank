import { useState, useEffect } from "react";
import { DocumentIcon } from "../icons/Documents";
import { HashIcon } from "../icons/hashTag";
import { LinkIcon } from "../icons/LinkIcon";
import { LogoIcon } from "../icons/logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { MenuIcon } from "../icons/MenuIcon";
import { CrossIcon } from "../icons/CrossIcon";

export function Sidebar({ isOpen, setIsOpen, typee, setType }: any) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    if(isMobile){
        setIsOpen(()=>(false))
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const items = [
        { type: "All_Content", text: "All Content", icon: <HashIcon /> },
        { type: "twitter", text: "Tweets", icon: <TwitterIcon /> },
        { type: "youtube", text: "Youtube", icon: <YouTubeIcon /> },
        { type: "notes", text: "Notes", icon: <DocumentIcon /> },
        { type: "Links", text: "Links", icon: <LinkIcon /> },
    ];

    return (
        <>
            {/* Sidebar for Large Screens */}
            {!isMobile && (
                <div className={`h-screen border-r w-60 absolute left-0 top-0 bg-white transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex text-2xl pt-6 items-center font-medium p-4">
                        <LogoIcon className="mr-2 text-purple-800  w-8 h-8" />
                        ThinkTank
                    </div>
                    <div className="pt-6 pl-4 ">
                        {items.map((item, index) => (
                            <SidebarItem 
                                key={index} 
                                text={item.text} 
                                icon={item.icon} 
                                onClick={() => {
                                    console.log(`Selected type: ${item.type}`);
                                    setType(item.type);
                                }} 
                                isActive={typee === item.type} 
                            />
                        ))}
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="absolute top-0 right-[-40px] bg-purple-800 text-white p-2">
                        {isOpen ? <CrossIcon /> : <MenuIcon />}
                    </button>
                </div>
            )}

            {/* Bottom Navigation for Mobile */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 border-t">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            className={`flex flex-col items-center text-gray-700 ${
                                typee === item.type ? "text-purple-800 font-bold" : ""
                            }`}
                            onClick={() => {
                                console.log(`Mobile Selected type: ${item.type}`);
                                setType(item.type);
                            }}
                        >
                            {item.icon}
                            <span className="text-xs">{item.text}</span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
