import React ,{useRef,useEffect} from "react";
import Block from "./Block";
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
}) {
 
  var refOfDraw = useRef(null);
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
        setTimeout(() => {
          return alert("player 1 won the macth");
        }, 0);
      } else if (
        marks[key[0]] == 2 &&
        marks[key[1]] == 2 &&
        marks[key[2]] == 2
      ) {
        setGameOver(true);
        refOfDraw.current && clearTimeout(refOfDraw.current);
        setTimeout(() => {
          return alert("player 2 won the macth");
        }, 0);
      }
    }
  }, marks);
  const changeMarks = (i) => {
    if (gameOver) {
      return alert("game over start a new match");
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
    <div className="board">
      <div className="player">
        <h1>Player1</h1>
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
        <button
          className="button"
          onClick={() => {
            setMarks([0, 0, 0, 0, 0, 0, 0, 0, 0]);
            setGameOver(false);
            setGameDraw(false);
            setCount(0);
            setPlayer(1);
          }}
        >
          new match
        </button>
      </div>
      <div className="player">
        <h1>Player2</h1>
      </div>
    </div>
  );
}

export default Board