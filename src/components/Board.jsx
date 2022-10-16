import { useDisclosure } from "@chakra-ui/react";
import React ,{useRef,useEffect, useState} from "react";
import Block from "./Block";
import BasicUsage from "./modal/Modal";
import Timer from "./timer/Timer";
import TimerTwo from "../timer2/TimerTwo";
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

  var refOfDraw = useRef(null);
// Modal
const [onOpen,setOpen] = useState(false)
const [isOpen,setIsOpen] = useState(false)

// Timer
const [start,setStart] = useState(false);
const [reset,setReset] =useState(false);
const [stop,setStop] = useState(false)
const [pause,setPause] =useState(false)
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
        setStop((state)=>state==true?false:true)

        setTimeout(() => {
          return alert(`${playersName[0]} won the match`);

        }, 0);
      } else if (
        marks[key[0]] == 2 &&
        marks[key[1]] == 2 &&
        marks[key[2]] == 2
      ) {
        setGameOver(true);
        setStop((state)=>state==true?false:true)

        refOfDraw.current && clearTimeout(refOfDraw.current);
        setTimeout(() => {
          return alert(`${playersName[1]} won the match`);
        }, 0);
      }
    }
   
  }, [marks]);
  
  const changeMarks = (i) => {

    if (gameOver) {
      return alert("game over start a new match");
    }else{
      setReset((state)=>state==true?false:true)
    }
    if (gameDraw) {
      return alert("please start a new game");
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
      alert("select any empty box");
    }

    if (count == marks.length) {
      setGameDraw(true);
      console.log("draw");
      refOfDraw.current = setTimeout(() => {
        if (!gameOver) {
          alert("Game Draw");
        }
      }, 10);
    }
  };
  return (
    <>
    <div className="gameName">
        <h1>TIC TAC TOE</h1>
        <Timer limit={limit} start={start} reset={reset} stop={stop}/>
    </div>
     <div className="board">
      <div className="player">
        <h1>{playersName[0]}</h1>
       
       
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
        </div>
      <div style={{display:"flex",justifyContent:"space-around"}}>
          <button
          className="button"
          onClick={() => {
            setMarks([0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setGameOver(false);
            setGameDraw(false);
            setCount(0);
            setPlayer(1);
            setStart((state)=>state==true?false:true)
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
      <div className="player">
        
         <h1 >{playersName[1]}</h1>         
      </div>
    </div></>
   
  );
}

export default Board