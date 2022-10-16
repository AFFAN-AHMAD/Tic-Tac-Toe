import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { connect, Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { reducer } from "./redux/reducer";
import BasicUsage from "./components/Modal";
import { useToast } from "@chakra-ui/react";
import Block from "./components/Block";
const store = createStore(reducer);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BoardContainer className="board"></BoardContainer>
      </Provider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    marks: state.marks,
    player: state.player,
    gameOver: state.gameOver,
    gameDraw: state.gameDraw,
    count: state.count,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMarks: (marks) => {
      dispatch({ type: "SET_MARKS", payload: marks });
    },
    setPlayer: (player) => {
      dispatch({ type: "SET_PLAYER", payload: player });
    },
    setGameOver: (gameOver) => {
      dispatch({ type: "SET_GAMEOVER", payload: gameOver });
    },
    setGameDraw: (gameDraw) => {
      dispatch({ type: "SET_GAMEDRAW", payload: gameDraw });
    },
    setCount: (count) => {
      dispatch({ type: "SET_COUNT", payload: count });
    },
  };
};
const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

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
  // useEffect(() => {
  //   if (gameDraw) {
  //     return
  //   }
  // }, [gameDraw]);
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

export default App;
