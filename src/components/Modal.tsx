import React from "react";
import capatalizeText from "../utils/capitalizeText";

interface ModalProps {
  headline?: string;
  text?: string;
  button?: string;
  promptText?: string;
  onClick?: () => void;
  onClose?: () => void;
  closeText?: string;
  moveCount?: number;
  imgSrc?: string;
}

const Modal: React.FC<ModalProps> = ({
  headline,
  text,
  button,
  promptText,
  onClick,
  onClose,
  closeText,
  moveCount,
  imgSrc,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="flex flex-col space-y-4 items-center justify-center bg-slate-800 p-6 rounded-md text-xl">
        {headline && <p>{capatalizeText(headline)}</p>}
        {imgSrc && (
          <div>
            <img src={imgSrc} className="w-full max-w-[500px]" />
          </div>
        )}
        {text && <p>{text}</p>}
        {moveCount !== undefined && <p>It took {moveCount} tries this time.</p>}
        {promptText && <p>{promptText}</p>}
        <div className="flex flex-col space-y-4 w-full lg:flex-row lg:space-x-4 lg:justify-evenly text-slate-800 font-bold text-base">
          {button && (
            <button
              className="bg-cyan-500 py-2 px-4 mt-4 rounded-md"
              onClick={onClick}
            >
              {button}
            </button>
          )}
          {closeText && (
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
