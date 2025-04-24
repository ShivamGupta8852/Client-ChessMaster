import { useEffect, useState, useRef } from 'react';
import socket from "../utils/socket.jsx";
import {initialGameState} from '../utils/constants.jsx';

const useChessGame = (roomID, userID) => {
    const [chessboard, setChessboard] = useState(initialGameState);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [opponentSelectedPieces, setOpponentSelectedPieces] = useState([]);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [playerTurn, setPlayerTurn] = useState("white");
    const [playingAs, setPlayingAs] = useState("");
    const [isKingInCheck, setIsKingInCheck] = useState(null);
    const [moveList, setMoveList] = useState([]);
    const [timers, setTimers] = useState({ white: 600000, black: 600000 });
    const timerRef = useRef({ white: 600000, black: 600000 });
    let checkTimeout;
    let role = "";

    useEffect(() => {
        socket.emit("joinGame", { roomID, userID });

        socket.on("UpdateGame", (game) => {
            const { board, turn, timers, moveList } = game.state;
            const { players } = game;
            const player = players.find((player) => player.userID === userID);
            role = player ? player.role : null;
            setTimers(timers);
            timerRef.current = timers;
            setChessboard(board);
            setMoveList(moveList);
            setPlayerTurn(turn);
            setPlayingAs(role);
            setOpponentSelectedPieces([]);
        });

        socket.on("possibleMoves", (possibleMoves) => {
            setPossibleMoves(possibleMoves);
        });

        socket.on("moved", (game) => {
            const { board, turn, timers, moveList } = game.state;
            setTimers(timers);
            timerRef.current = timers;
            setMoveList(moveList);
            setChessboard(board);
            setPlayerTurn(turn);
            setPossibleMoves([]);
            setSelectedPiece(null);
        });

        socket.on("check", (game, kingPosition) => {
            const { board, turn } = game.state;
            setChessboard(board);
            setPlayerTurn(turn);
            setIsKingInCheck(kingPosition);
            setPossibleMoves([]);
            setSelectedPiece(null);

            checkTimeout = setTimeout(() => {
                setIsKingInCheck(null);
            }, 3000);
        });

        socket.on("opponentSelectedPiece", (position) => {
            setOpponentSelectedPieces((prevOpponentSelectedPieces) => [
                ...prevOpponentSelectedPieces,
                position,
            ]);
        });

        socket.on("updateBoard", (newBoard) => {
            setChessboard(newBoard);
            setSelectedPiece(null);
            setPossibleMoves([]);
            setOpponentSelectedPieces([]);
        });

        socket.on('checkmate',(winner) => {
            if(winner === role){
                console.log("You won!!");
            }
            else{
                console.log("you lose the match!!");
            }
            console.log("checkmate winner" + winner);
        })

        // socket.on("connect", () => {
        //     socket.emit("joinGame", { roomID, userID });
        // });

        socket.on("reconnect", () => {
            socket.emit("joinGame", { roomID, userID });
        });

        return () => {
            socket.off("UpdateGame");
            socket.off("possibleMoves");
            socket.off("moved");
            socket.off("check");
            socket.off("updateBoard");
            socket.off("opponentSelectedPiece");
        };
    }, []);

    return {
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
    }
}

export default useChessGame