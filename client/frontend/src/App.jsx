
import { useEffect, useMemo, useState } from 'react'
import { network } from '../../Network'
import './App.css'
import {io} from "socket.io-client"

function App() {
  const socket=useMemo(()=>io(network),[]);
  const[message,setmessage]=useState("");
  const[id,setId]=useState("");
  const[userid,setuserid]=useState("");


function send(){
  socket.emit("message",{message,id});
  setmessage("")
}
  

  useEffect(()=>{

    socket.on("connect",()=>{
      console.log(`connected client ${socket.id}`)
      setuserid(socket.id);
    })

    socket.on("disconnect",()=>{
      console.log(socket.id)
    })

    socket.on("welcome",(data)=>{
      console.log(data)
    })

    socket.on("sent",(data)=>{
        console.log(data)
    })
     
    return()=>{
      socket.disconnect()
    }

  },[])

  return (
    <> 


  <div className='h-5'>
    {userid}

  </div>
  <button className='bg-red-300' onClick={()=>{
    socket.disconnect()
  }}>
    disconnect
  </button>

  <div>
    <input value={message}  placeholder='send your message here' onChange={(e)=>{setmessage(e.target.value)}}>

    </input>
    <button className='bg-green-400' onClick={send}>
      send message
    </button>
  </div>
  <div>
    <input value={id} onChange={(e)=>{setId(e.target.value)}} placeholder='roomID'>
        
    </input>
    <button className='bg-amber-600' onClick={()=>{
      socket.emit("join",id)
      console.log(`room connected wiht id:${id}`)
    }}>
      Create Room 
    </button>
  </div>
    </>
  )
}

export default App
