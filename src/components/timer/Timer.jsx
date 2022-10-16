import React , { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css"
import { Button } from "@chakra-ui/react";
const Timer = ({start,limit,reset,stop,pause,player}) => {
    let [counter,setCounter]  = useState(10);
    let [secCounter,setSecCounter] = useState(limit);
    let [isRunning,setRunning] =useState(false);

   useEffect(()=>{
        handlePause()
      
    },[pause])
    useEffect(()=>{
        setSecCounter(limit)
       
    },[reset,limit])
     useEffect(()=>{
            handleStart()
            setSecCounter(limit);
    },[start])
    useEffect(()=>{
        handleReset()
       
    },[reset])
    useEffect(()=>{
             handleStop()
            
    //    console.log("stop")
    },[stop])
    
    const ref= useRef(null)
    const ref1 = useRef(null)
    const handleStart = ()=>{
         if(isRunning){
            return
        }
        ref.current = setInterval(()=>{
            setCounter((oldState)=>oldState-1)
        },100)
        ref1.current =setInterval(()=>{
            setCounter(10)
            setSecCounter((oldState)=>oldState-1)
        },1000)
        setInterval(()=>{
            setCounter(10)
            setSecCounter(limit)
        },limit*1000)
        setRunning(true)
    }
    const handleStop=()=>{
        clearInterval(ref.current)
        clearInterval(ref1.current)
        setRunning(false)
    }

    const handleReset = ()=>{
        // handleStop()
        setCounter(10)
        setSecCounter(limit)
        // handleStart()
    }
      const handlePause = ()=>{
        setCounter("00")
        setSecCounter("00")
        handleStop()
    }

   
   
  return (
    <div>
        <h1>{secCounter}:{counter}</h1>
        
    </div>
  )
}

export default Timer