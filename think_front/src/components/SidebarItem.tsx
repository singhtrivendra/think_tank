import { ReactElement } from "react"

export function SidebarItem({text,icon}:{
    text:string;
    icon:ReactElement;
}){
    return <div className="flex text-gray-700 py-4 cursor-pointer 
    hover:bg-gray-200 rounded max-w-52 pl-4 transition-all duration-500">
        <div className="pr-2 ">
        {icon} 
        </div>
      <div >
      {text}
      </div>

    </div>
}