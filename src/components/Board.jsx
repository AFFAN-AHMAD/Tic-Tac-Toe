import { useToast  } from "@chakra-ui/react";
import React ,{useRef,useEffect, useState} from "react";
import Block from "./Block";
import BasicUsage from "./modal/Modal";
import Timer from "./timer/Timer";
var prev;
function Board({
  marks,
  player,
  setMarks,
  setPlayer,
  gameOver,
  setGameOver,
  gameDraw,
  setGameDraw,
  count,
  setCount,
  limit,
  setLimit,
  playersName,
  setPlayersName
}) {
// player
const [color,setColor] = useState(false)

// toast
 const toast = useToast()
  var refOfDraw = useRef(null);
// Modal
const [onOpen,setOpen] = useState(false)
const [isOpen,setIsOpen] = useState(false)

// Timer
const [start,setStart] = useState(false);
const [reset,setReset] =useState(false);
const [stop,setStop] = useState(false)
const [pause,setPause] =useState(false)
function funct(winner){
  toast.closeAll()
    toast({
                title: `Time up! ${winner.toUpperCase()} won the match`,
                isClosable: true,
                position:"top",
                status:"success",
              })
};
 let  debouncing;
const debouncer = (func,delay,winner,prev)=>{

    prev&&clearTimeout(prev)
    // debouncing&&clearTimeout(debouncing);
    debouncing = setTimeout(() => {
        func(winner)
        setStop((state)=>state==true?false:true)
        setGameOver(true)
        setColor(false)
    }, delay*1001);
    return debouncing
}


  useEffect(() => {
    let combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let key of combinations) {
      if (marks[key[0]] == 1 && marks[key[1]] == 1 && marks[key[2]] == 1) {
        setGameOver(true);
        refOfDraw.current && clearTimeout(refOfDraw.current);
        setColor(false)
        setStop((state)=>state==true?false:true)
        prev&&clearTimeout(prev)
        setTimeout(() => {
        toast.closeAll()
          return toast({
                title: `${playersName[0].toUpperCase()} won the match`,
                isClosable: true,
                position:"top",
                status:"success",
              })

        }, 0);
      } else if (
        marks[key[0]] == 2 &&
        marks[key[1]] == 2 &&
        marks[key[2]] == 2
      ) {
        setGameOver(true);
        setStop((state)=>state==true?false:true)
        setColor(false)
        refOfDraw.current && clearTimeout(refOfDraw.current);
        prev&&clearTimeout(prev)
        setTimeout(() => {
          toast.closeAll()
          return  toast({
                title: `${playersName[1].toUpperCase()} won the match`,
                isClosable: true,
                position:"top",
                status:"success",
              })
        }, 0);
      }
    }
   
  }, [marks]);
  // let timeOut;

  let winner=""
  const changeMarks = (i) => {
    if(pause==false){
      toast.closeAll()
       return  toast({
                title: "start the game on clinking the New Match button below",
                isClosable: true,
                position:"top",
                status:"error",
              })
    }
    if(player==1){
      winner=playersName[0]
    }else{
      winner=playersName[1]
    }
  prev =debouncer(funct,limit,winner,prev)
    if (gameOver) {
      toast.closeAll()
      return  toast({
                title: `Game Over! start a new match`,
                isClosable: true,
                position:"top",
                status:"error",
              })
      //  alert("game over start a new match");
    }else{
      if(marks[i]==0){
        setReset((state)=>state==true?false:true)
      }
    }
    if (gameDraw) {
       toast.closeAll()
      return toast({
                title: `Game Over! please start a new game`,
                isClosable: true,
                position:"top",
                status:"warning",
              })
    }
    if (marks[i] == 0) {
      const m = [...marks];
      m[i] = player;
      setMarks(m);
      setCount(++count);
      if (player == 1) {
        player = 2;
      } else {
        player = 1;
      }
      setPlayer(player);
    } else {
      toast.closeAll()
      return  toast({
                title: `please select an Empty Box`,
                isClosable: true,
                position:"top",
                status:"warning",
              })
    }  

    if (count == marks.length) {
      setGameDraw(true);
      setStop((state)=>state==true?false:true)
      setColor(false)
      refOfDraw.current = setTimeout(() => {
        if (!gameOver) {

           toast({
                title: `Draw!`,
                isClosable: true,
                position:"top",
                status:"error",
              })

              setGameOver(true)
              return
        }
      }, 10);
    }
  };
  return (
    <>
    <div className="gameName">
        <h1 className="game" >TIC TAC TOE</h1>
        <Timer limit={limit} start={start} reset={reset} stop={stop}/>
    </div>
     <div className="board">
      <div className="player">
     {
          color? <h1 style={{color:player==1?"green":"red",fontWeight:"bold"}} >{playersName[0]}</h1> :
          <h1 style={{fontWeight:"bold"}}>{playersName[0]}</h1>
        }
       
      </div>
      <div>
        <div>
          <Block
            mark={`${marks[0]}`}
            position={0}
            changeMarks={changeMarks}
          ></Block>
          <Block
            mark={`${marks[1]}`}
            position={1}
            changeMarks={changeMarks}
          ></Block>
          <Block
            mark={`${marks[2]}`}
            position={2}
            changeMarks={changeMarks}
          ></Block>
        </div>
        <div>
          <Block
            mark={`${marks[3]}`}
            position={3}
            changeMarks={changeMarks}
          ></Block>
          <Block
            mark={`${marks[4]}`}
            position={4}
            changeMarks={changeMarks}
          ></Block>
          <Block
            mark={`${marks[5]}`}
            position={5}
            changeMarks={changeMarks}
          ></Block>
        </div>
        <div>
          <Block
            mark={`${marks[6]}`}
            position={6}
            changeMarks={changeMarks}
          ></Block>
          <Block
            mark={`${marks[7]}`}
            position={7}
            changeMarks={changeMarks}
          ></Block>
          <Block
            mark={`${marks[8]}`}
            position={8}
            changeMarks={changeMarks}
          ></Block>
            <div className="buttonContainer" >
          <button
          className="button"
          onClick={() => {
            toast.closeAll()
            setMarks([0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setGameOver(false);
            setGameDraw(false);
            setCount(0);
            setPlayer(1);
            setPause(true)
            setStart((state)=>state==true?false:true)
            setColor(true)
           prev= debouncer(funct,limit,playersName[1],prev)

           console.log("new match")
          }}
        >
         New Match
        </button>
        <BasicUsage onOpen={onOpen} isOpen={isOpen} setOpen={setOpen} setPlayersName={setPlayersName} setLimit={setLimit}/>
        <button className="button" onClick={()=>{
            setOpen(true)
            setIsOpen(true)
        }}>Settings</button>
      </div>
        </div>
    
      </div>
      <div className="player">
        {
          color? <h1 style={{color:player==2?"green":"red",fontWeight:"bold"}} >{playersName[1]}</h1> :
          <h1 style={{fontWeight:"bold"}}>{playersName[1]}</h1>
        }
                
      </div>
    </div></>
   
  );
}

export default Board