import React , { useEffect, useRef, useState } from "react";
// import styles from "./TimerTwo.module.css"
import { Button } from "@chakra-ui/react";
const TimerTwo = ({start,limit,reset,stop,pause,gameOver}) => {
    let [counter,setCounter]  = useState(0);
    let [secCounter,setSecCounter] = useState(limit);
    let [isRunning,setRunning] =useState(false);
    useEffect(()=>{
        handleOver()
    },[gameOver])
   useEffect(()=>{
        handlePause()
    },[pause])
    useEffect(()=>{
        setSecCounter(limit)
    },[reset,limit])
     useEffect(()=>{
            handleStart()
    },[start])
    useEffect(()=>{
        handleReset()
    },[reset])
    useEffect(()=>{
             handleStop()
       console.log("stop")
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
    const handleOver = ()=>{
        setCounter("00")
        setSecCounter("00")
        clearInterval(ref.current)
        clearInterval(ref1.current)
        setRunning(false)
    }
  return (
    <div>
        {secCounter}:{counter}
    </div>
  )
}

export default TimerTwo