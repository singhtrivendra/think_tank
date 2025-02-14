import { DocumentIcon } from "../icons/Documents";
import { HashIcon } from "../icons/hashTag";
import { LinkIcon } from "../icons/LinkIcon";
import { LogoIcon } from "../icons/logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen border-r w-60 absolute left-0 top-0 ">
        <div className="flex text-2xl pt-8 items-center p-3  font-">
            <div className="pr-2 text-purple-800 ">
            <LogoIcon/>
            </div>
            ThinkThank
        </div>
       <div className="pt-8 pl-4">
        <SidebarItem text="Tweets" icon={<TwitterIcon/>}/>
        <SidebarItem text="Videos" icon={<YouTubeIcon/>}/>
        <SidebarItem text="Documents" icon={<DocumentIcon/>}/>
        <SidebarItem text="Links" icon={<LinkIcon/>}/>
        <SidebarItem text="Tags" icon={<HashIcon/>}/>
        
       </div>
    </div>
}