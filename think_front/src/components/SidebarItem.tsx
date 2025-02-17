import { ReactElement } from "react";

export function SidebarItem({ text, icon, onClick, isActive }: { text: string; icon: ReactElement; onClick: () => void; isActive: boolean }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center py-3 px-4 m-2 cursor-pointer rounded-lg transition-all duration-300 ${
                isActive ? "bg-gray-200 text-black font-bold" : "text-gray-700 hover:bg-gray-200"
            }`}
        >
            <div className="text-xl">{icon}</div>
            {text && <span className="ml-3">{text}</span>}
        </div>
    );
}
