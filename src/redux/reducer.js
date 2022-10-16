const init = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  gameOver: false,
  gameDraw: false,
  count: 0,
  playersName: ["player1", "player2"],
  limit: 0,
};

export const reducer = (state = init, action) => {
  switch (action.type) {
    case "SET_MARKS":
      return {
        ...state,
        marks: action.payload,
      };
    case "SET_PLAYER":
      return {
        ...state,
        player: action.payload,
      };
    case "SET_GAMEOVER":
      return {
        ...state,
        gameOver: action.payload,
      };
    case "SET_GAMEDRAW":
      return {
        ...state,
        gameDraw: action.payload,
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    case "SET_NAMES":
      return {
        ...state,
        playersName: action.payload,
      };

    case "SET_LIMIT":
      return {
        ...state,
        limit: action.payload,
      };
    default:
      return state;
  }
};
