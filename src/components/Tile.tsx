import React from "react";

interface TileProps {
  number: number;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ number, onClick }) => {
  // Check if isEmpty is 0, if so, isEmpty is true
  const isEmpty = number === 0;
  return (
    // Render the tile according to the isEmpty state
    <div
      className={`flex justify-center items-center min-h-16 md:min-h-24 aspect-square rounded-md border-transparent
         text-cyan-500 text-2xl md:text-4xl font-bold select-none transition-all duration-300 ${
           isEmpty
             ? "bg-transparent border-none cursor-default"
             : "bg-slate-800 cursor-pointer border hover:border-cyan-500"
         } `}
      onClick={isEmpty ? undefined : onClick}
    >
      {isEmpty ? "" : number}
    </div>
  );
};

export default Tile;
