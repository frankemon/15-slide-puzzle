import React from "react";
import Tile from "./Tile";

interface BoardProps {
  tiles: number[];
  onTileClick: (index: number) => void;
  cols: number;
}

const Board: React.FC<BoardProps> = ({ tiles, onTileClick, cols }) => {
  return (
    // Render board with tiles according to cols prop
    <div
      className={`grid gap-1 p-1 mb-4 bg-slate-700 shadow rounded-md`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {/* Map and render tiles array with Tile component, each with number and onClick
      function (passes tile index up) from props (onTileClick from App.tsx) */}
      {tiles.map((tile, index) => (
        <Tile key={index} number={tile} onClick={() => onTileClick(index)} />
      ))}
    </div>
  );
};

export default Board;
