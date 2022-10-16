import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { connect, Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { reducer } from "./redux/reducer";
// import BasicUsage from "./components/Modal";
import { useToast } from "@chakra-ui/react";
import Block from "./components/Block";
import Board from "./components/Board";
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
    playersName: state.playersName,
    limit: state.limit,
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
    setPlayersName: (playersName) => {
      dispatch({ type: "SET_NAMES", payload: playersName });
    },
    setLimit: (limit) => {
      console.log(limit);
      dispatch({ type: "SET_LIMIT", payload: limit });
    },
  };
};
const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default App;
