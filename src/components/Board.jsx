import React from 'react';
import {getBoardForRole} from '../utils/helperFunctions.jsx';
import {rows,columns} from '../utils/constants.jsx';
import Square from './Square.jsx';


const Board = ({chessboard,playingAs,selectedPiece,possibleMoves,handleSquareClick,isKingInCheck,opponentSelectedPieces}) => {
  const displayedBoard = getBoardForRole(chessboard, playingAs);
  return (
        <div className="flex flex-col">
          {displayedBoard.map((row, rowIndex) => {
            return (
              <div key={rows[rowIndex]} className="flex">
                {row.map((piece, colIndex) => {
                  const adjustedColIndex = playingAs === "black" ? 7 - colIndex : colIndex;
                  const adjustedRowIndex = playingAs === "black" ? 7 - rowIndex : rowIndex;
                  const position = `${columns[adjustedColIndex]}${rows[adjustedRowIndex]}`;
                  const isSelected = selectedPiece && selectedPiece.position === position;
                  const isCurrentKingInCheck = isKingInCheck === position;
                  return (
                    <Square
                      key={columns[colIndex]}
                      position={position}
                      opponentSelectedPieces = {opponentSelectedPieces}
                      piece={piece}
                      isSelected={isSelected}
                      possibleMoves={possibleMoves}
                      handleSquareClick={handleSquareClick}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      isCurrentKingInCheck={isCurrentKingInCheck}
                      playingAs = {playingAs}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
  )
}

export default Board;