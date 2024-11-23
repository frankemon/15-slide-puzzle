import React from "react";
import capatalizeText from "../utils/capitalizeText";

interface ModalProps {
  text: string;
  button: string;
  prompt: boolean;
  promptText: string;
  close: boolean;
  onClick: () => void;
  onClose: () => void;
  closeText: string;
  moveCount: number;
}

const Modal: React.FC<ModalProps> = ({
  text,
  button,
  prompt,
  promptText,
  close,
  onClick,
  onClose,
  closeText,
  moveCount,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col space-y-4 items-center justify-center bg-slate-800 p-6 rounded-md  text-xl">
        <p>{capatalizeText(text)}</p>
        <p>It took {moveCount} tries this time.</p>
        {prompt && <p>{promptText}</p>}
        <div className="flex flex-col space-y-4 w-full lg:flex-row lg:space-x-4 lg:justify-evenly text-slate-800 font-bold text-base">
          <button
            className="bg-cyan-500 py-2 px-4 mt-4 rounded-md"
            onClick={onClick}
          >
            {button}
          </button>
          {close && (
            <button
              className="bg-red-500 py-2 px-4 mt-4 rounded-md"
              onClick={onClose}
            >
              {closeText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
