import { ReactElement } from "react";

export function SidebarItem({ text, icon }: { text: string; icon: ReactElement }) {
    return (
        <div className="flex items-center text-gray-700 py-3 px-4 cursor-pointer hover:bg-gray-200 rounded-lg transition-all duration-300">
            <div className="text-xl">{icon}</div>
            {text && <span className="ml-3">{text}</span>}
        </div>
    );
}
