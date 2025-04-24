import React, { useEffect, useState } from "react";
import {FaMicrophone,FaMicrophoneSlash , FaStepBackward, FaUndo,FaRedo,FaStepForward} from "react-icons/fa";
import socket from "../utils/socket";
import { columns, rows } from "../utils/constants.jsx";
import { modified_movelist } from "../utils/helperFunctions.jsx";

const Controls = ({roomID,chessboard,playerTurn,playingAs,moveList}) => {
  const [isListening, setIsListening] = useState(false);
  const newMoveList = modified_movelist(moveList,2);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(command);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleVoiceCommand = (command) => {
    const moveMatch = command.match(/(?:make a move from |move |move from |make a move )?(\w\d) to (\w\d)/i);
    if (moveMatch) {
      const from = moveMatch[1];
      const to = moveMatch[2];
      let fromRow = rows.indexOf(from[1]);
      let fromCol = columns.indexOf(from[0]);
      const piece = chessboard[fromRow][fromCol];

      // emit validateMove event to server
      if(playerTurn == playingAs && piece.startsWith(playerTurn) && piece){
        socket.emit("validateMove", {
          roomID,
          piece,
          from,
          to
        });
        setIsListening(false);
      } else{
        console.log("invalid move");
        setIsListening(false);
      }
    } else {
      console.log("Command not recognized:", command);
      setIsListening(false);
    }
  };

  function  handleVoiceButton() {
    if(playerTurn == playingAs){
      setIsListening(!isListening);
    }
  }

  return (
    <div className="md:mt-4  flex flex-col gap-y-4 mb-1">
      <div className="flex flex-wrap md:flex-nowrap justify-evenly  md:px-40 lg:gap-x-3">
        <button onClick={() => socket.emit('beginning', { roomID })} className="text-2xl bg-green-700 text-rose-100 md:px-6 px-3 py-2 rounded-sm"><FaStepBackward /></button>
        <button onClick={() => socket.emit('undo', { roomID })} className="text-2xl bg-green-700 text-rose-100 md:px-6 px-3 py-2 rounded-sm"><FaUndo /></button>
        <button onClick={() => socket.emit('redo', { roomID })} className="text-2xl bg-green-700 text-rose-100 md:px-6 px-3 py-2 rounded-sm"><FaRedo /></button>
        <button onClick={() => socket.emit('ending', { roomID })} className="text-2xl bg-green-700 text-rose-100 md:px-6 px-3 py-2 rounded-sm"><FaStepForward /></button>
        <button onClick={handleVoiceButton} className="text-2xl bg-green-700 text-rose-100 md:px-6 px-3 py-2 rounded-sm">
          {isListening ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
      </div>

      <div className="md:w-[600px] md:mx-auto h-[400px] md:h-[370px] overflow-y-auto flex flex-col pr-0 bg-slate-700 text-white rounded-lg">
        {newMoveList.map((pair, pairIndex) => {
          return (
            <div key={pairIndex} className={`flex items-center py-1 px-3 ${pairIndex%2 == 0 ? "bg-slate-800" : "bg-slate-600"}`}>
              <div className="w-1/5">{pairIndex + 1}.</div>
              {pair.map((move, moveIndex) => (
                <div
                  key={moveIndex}
                  className="w-[38%] text-center py-3 ml-1"
                >
                  {move.to}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Controls;
