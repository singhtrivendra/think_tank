import { DeleteIcon } from "../icons/DeleteIcon";

import { ShareIcon } from "../icons/ShareIcon";
import { DeleteContent } from "./Delete";

interface CardProps {
    title: string,
    link: string,
    description?: String,
    type: "twitter" | "youtube" | "notes" | "Links" | "Tags";
}

const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    const youtubeRegex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
        videoId = match[1];
    }
    return `https://www.youtube.com/embed/${videoId}`;
};

export function Card({ title, link, type, description }: CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 
    border min-h-48 min-w-72 ">
            <div className="flex justify-between">
                <div className="flex items-center text-md font-medium">
                    <div className="pr-2 text-gray-500">
                        {/* <ShareIcon /> */}
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank"><ShareIcon /></a>

                    </div>
                    <div className="text-gray-500">
                        <button onClick={ async () => await DeleteContent(title)  } >{<DeleteIcon />}</button>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" &&
                    <iframe
                            className="w-full h-44 rounded-md"
                            src={getYouTubeEmbedUrl(link)}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>                }
               {type === "twitter" && (
    <div className="h-48 overflow-scroll">
        <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
    </div>
)}

                {type === "notes" && (
                    <div className="p-4 border border-gray-300 rounded-md bg-gray-100 shadow-md max-h-40 overflow-scroll text-ellipsis break-words">
                        <p className="text-gray-700">{description}</p>
                    </div>

                )}
               
                {type === "Tags" && (
                    <div className="flex flex-wrap gap-2">
                        {link.split(",").map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>

}
