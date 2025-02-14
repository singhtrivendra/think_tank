import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";

export async function DeleteContent(title:any){
        
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            data: {
                title,
            },
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        useContent();
}