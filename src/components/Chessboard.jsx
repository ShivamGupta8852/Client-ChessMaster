// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { initialGameState, rows, columns } from "../utils/constants";
// import socket from "../utils/socket";
// import Square from "./Square.jsx";
// import Controls from "./Controls.jsx";
// import { getBoardForRole } from "../utils/helperFunctions.jsx";

// const Chessboard = () => {
//   const { roomID } = useParams();
//   const userID = localStorage.getItem("userID");
//   const [chessboard, setChessboard] = useState(initialGameState);
//   const [selectedPiece, setSelectedPiece] = useState(null);
//   const [opponentSelectedPieces, setOpponentSelectedPieces] = useState([]);
//   const [possibleMoves, setPossibleMoves] = useState([]);
//   const [playerTurn, setPlayerTurn] = useState("white");
//   const [playingAs, setPlayingAs] = useState("");
//   const [isKingInCheck, setIsKingInCheck] = useState(null);
//   const [timers, setTimers] = useState({white: 600000, black: 600000 });
//   const timerRef = useRef({ white: 600000, black: 600000 });
//   // const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
//   const [moveList, setMoveList] = useState([]);
//   let checkTimeout;

//   const joinGame = () => {
//     socket.emit("joinGame", { roomID, userID });
//   };

//   useEffect(() => {
//     socket.emit("joinGame", { roomID, userID });

//     socket.on("UpdateGame", (game) => {
//       const { board, turn,timers,moveList } = game.state;
//       const { players } = game;
//       const player = players.find((player) => player.userID === userID);
//       const role = player ? player.role : null;
//       setTimers(timers);
//       timerRef.current = timers;
//       setChessboard(board);
//       setMoveList(moveList);
//       setPlayerTurn(turn);
//       setPlayingAs(role);
//       setOpponentSelectedPieces([]);
//     });

//     socket.on("possibleMoves", (possibleMoves) => {
//       setPossibleMoves(possibleMoves);
//     });

//     socket.on("moved", (game) => {
//       const { board, turn, timers,moveList } = game.state;
//       setTimers(timers);
//       timerRef.current = timers;
//       setMoveList(moveList);
//       setChessboard(board);
//       setPlayerTurn(turn);
//       setPossibleMoves([]);
//       setSelectedPiece(null);
//     });

//     socket.on("check", (game, kingPosition) => {
//       const { board, turn } = game.state;
//       setChessboard(board);
//       setPlayerTurn(turn);
//       setIsKingInCheck(kingPosition);
//       setPossibleMoves([]);
//       setSelectedPiece(null);

//       checkTimeout = setTimeout(() => {
//         setIsKingInCheck(null);
//       }, 3000);
//     });

//     socket.on("opponentSelectedPiece", (position) => {
//       setOpponentSelectedPieces((prevOpponentSelectedPieces) => [...prevOpponentSelectedPieces, position]);
//     })

//     socket.on('updateBoard' , (newBoard) => {
//       setChessboard(newBoard);
//       setSelectedPiece(null);
//       setPossibleMoves([]);
//       setOpponentSelectedPieces([]);
//     })


//     socket.on("connect", () => {
//       joinGame();
//     });
//     socket.on("reconnect", () => {
//       joinGame();
//     });

//     return () => {
//       socket.off("UpdateGame");
//       socket.off("possibleMoves");
//       socket.off("moved");
//       socket.off("check");
//       socket.off("updateBoard");
//       socket.off("opponentSelectedPiece");
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (playerTurn) {
//         const newTimers = {
//           ...timerRef.current,
//           [playerTurn]: timerRef.current[playerTurn] - 1000,
//         };
//         setTimers(newTimers);
//         timerRef.current = newTimers;
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [playerTurn]);

//   function handleSquareClick(piece, position) {
//     if (piece && piece.startsWith(playerTurn) && playingAs == playerTurn) {
//       if (checkTimeout) clearTimeout(checkTimeout);
//       setIsKingInCheck(null);
//       setSelectedPiece({ piece, position });
//       socket.emit("getPossibleMoves", roomID, piece, position);
//     } 
//     else if (selectedPiece && possibleMoves.includes(position)) {
//       socket.emit("validateMove", {
//         roomID,
//         piece: selectedPiece.piece,
//         from: selectedPiece.position,
//         to: position,
//       });
//       setOpponentSelectedPieces([]);
//     }
//     else{
//       setPossibleMoves([]);
//       setSelectedPiece(null);
//     }
//   }

//   const displayedBoard = getBoardForRole(chessboard, playingAs);

//   return (
//     <div className="max-w-full md:max-h-screen flex gap-4 flex-col lg:flex-row bg-slate-900 pt-16">
//       <div className="w-full md:w-auto md:mx-16 pt-5 md:pt-0 text-white flex flex-col lg:justify-center items-center gap-2">
//         {playingAs === "black" ? <div className="text-xl lg:text-lg">
//           White Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.white / 60000)} : {Math.floor((timers.white % 60000) / 1000).toString().padStart(2, '0')}</span>
//         </div> : 
//         <div className="text-xl lg:text-lg">
//           Black Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.black / 60000)} : {Math.floor((timers.black % 60000) / 1000).toString().padStart(2, '0')}</span>
//         </div>
//          }
//         <div className="flex flex-col">
//           {displayedBoard.map((row, rowIndex) => {
//             return (
//               <div key={rows[rowIndex]} className="flex">
//                 {row.map((piece, colIndex) => {
//                   const adjustedColIndex = playingAs === "black" ? 7 - colIndex : colIndex;
//                   const adjustedRowIndex = playingAs === "black" ? 7 - rowIndex : rowIndex;
//                   const position = `${columns[adjustedColIndex]}${rows[adjustedRowIndex]}`;
//                   const isSelected = selectedPiece && selectedPiece.position === position;
//                   const isCurrentKingInCheck = isKingInCheck === position;
//                   return (
//                     <Square
//                       key={columns[colIndex]}
//                       position={position}
//                       opponentSelectedPieces = {opponentSelectedPieces}
//                       piece={piece}
//                       isSelected={isSelected}
//                       possibleMoves={possibleMoves}
//                       handleSquareClick={handleSquareClick}
//                       rowIndex={rowIndex}
//                       colIndex={colIndex}
//                       isCurrentKingInCheck={isCurrentKingInCheck}
//                       playingAs = {playingAs}
//                     />
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </div>
//         {playingAs === "black" ? <div className="text-xl lg:text-lg">
//           Black Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.black / 60000)} : {Math.floor((timers.black % 60000) / 1000).toString().padStart(2, '0')}</span>
//         </div> : 
//         <div className="text-xl lg:text-lg">
//           White Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.white / 60000)} : {Math.floor((timers.white % 60000) / 1000).toString().padStart(2, '0')}</span>
//         </div>
//          }
//       </div>
//       <Controls 
//         roomID={roomID}
//         chessboard = {chessboard}
//         playerTurn = {playerTurn}
//         playingAs = {playingAs}
//         moveList = {moveList}
//       />
//     </div>
//   );
// };

// export default Chessboard;



import React from 'react';
import { useParams } from 'react-router-dom';
import useChessGame from '../hooks/useChessGame.jsx';
import useTimers from '../hooks/useTimers.jsx';
import Board from './Board.jsx';
import Controls from './Controls.jsx';
import socket from '../utils/socket.jsx';

const Chessboard = () => {
  const { roomID } = useParams();
  const userID = sessionStorage.getItem("userID");

  const {
    chessboard,
    selectedPiece,
    opponentSelectedPieces,
    possibleMoves,
    playerTurn,
    playingAs,
    isKingInCheck,
    timers,
    timerRef,
    moveList,
    checkTimeout,
    setTimers,
    setSelectedPiece,
    setPossibleMoves,
    setOpponentSelectedPieces,
    setIsKingInCheck,
  } = useChessGame(roomID, userID);


  useTimers(playerTurn, timerRef, setTimers);

  const handleSquareClick = (piece, position) => {
    if (piece && piece.startsWith(playerTurn) && playingAs === playerTurn) {
      if (checkTimeout) clearTimeout(checkTimeout);
      setIsKingInCheck(null);
      setSelectedPiece({ piece, position });
      socket.emit("getPossibleMoves", roomID, piece, position);
    } else if (selectedPiece && possibleMoves.includes(position)) {
      socket.emit("validateMove", {
        roomID,
        piece: selectedPiece.piece,
        from: selectedPiece.position,
        to: position,
        playingAs,
      });
      setOpponentSelectedPieces([]);
    }
  };

  return (
    <div className="flex md:max-h-[100vh] gap-x-20 gap-y-10 flex-col lg:flex-row  bg-slate-900 pt-16 pb-4 px-4 md:px-10">
      <div className="mx-auto md:ml-10 mt-4 text-white flex flex-col gap-3">
        {playingAs === "black" ? <div className="text-xl lg:text-lg">
          White Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.white / 60000)} : {Math.floor((timers.white % 60000) / 1000).toString().padStart(2, '0')}</span>
        </div> :
          <div className="text-xl lg:text-lg">
            Black Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.black / 60000)} : {Math.floor((timers.black % 60000) / 1000).toString().padStart(2, '0')}</span>
          </div>
        }
        <Board
          chessboard={chessboard}
          selectedPiece={selectedPiece}
          opponentSelectedPieces={opponentSelectedPieces}
          possibleMoves={possibleMoves}
          handleSquareClick={handleSquareClick}
          isKingInCheck={isKingInCheck}
          playingAs={playingAs}
        />
        {playingAs === "black" ? <div className="text-xl lg:text-lg">
          Black Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.black / 60000)} : {Math.floor((timers.black % 60000) / 1000).toString().padStart(2, '0')}</span>
        </div> :
          <div className="text-xl lg:text-lg">
            White Timer : <span className="bg-slate-700 px-[6px] py-[1.5px] rounded"> {Math.floor(timers.white / 60000)} : {Math.floor((timers.white % 60000) / 1000).toString().padStart(2, '0')}</span>
          </div>
        }
      </div>
      <Controls
        roomID={roomID}
        chessboard={chessboard}
        playerTurn={playerTurn}
        playingAs={playingAs}
        moveList={moveList}
      />
    </div>
  )
}

export default Chessboard;
