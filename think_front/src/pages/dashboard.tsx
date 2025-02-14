
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function DashBoard() {
    const [modelOpen, SetModelOpen] =useState(false);
    const {contents,refresh} = useContent();

    useEffect(() =>{
      refresh();
    },[modelOpen])
  return (
    <div>
      <Sidebar/>
    <div className='p-4 ml-60 min-h-screen bg-gray-100 border-2'>
      <CreateContentModel open={modelOpen} onClose={() =>{
        SetModelOpen(false);
      }}/>
      <div className='flex justify-end gap-4'>
   
        <Button onClick={ async () =>{
         const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share:true,
          },{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          });
          const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
          alert(shareUrl);
        }} variant='secondary' text='Share Brain' startIcon={<ShareIcon/>}></Button>

        <Button onClick={()=>{
          SetModelOpen(true)
        }} variant='primary' text='Add Content' startIcon={<PlusIcon/>}></Button>
        </div>
        <div className='flex gap-4 flex-wrap pt-5'>
          {contents.map(({type,link,title},index) => 
          <Card key={index} title={title} link={link} type={type}/>)}
        </div>
    </div>
    </div>
  )
}


