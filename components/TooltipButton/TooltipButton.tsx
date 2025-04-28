// components/TooltipButton.tsx
import React from "react";

interface TooltipButtonProps {
  icon: React.ElementType;
  tooltip: string;
  onClick?: () => void;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ icon: Icon, tooltip, onClick }) => {
  return (
    <button onClick={onClick} className="relative group flex items-center justify-center">
      <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
        <Icon size={18} className="text-white" />
      </div>
      <div className="absolute bottom-full mb-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
        <div className="rounded-md bg-[#4c535b] px-3 py-1.5 text-[13px] text-white font-semibold shadow-md whitespace-nowrap">
          {tooltip}
        </div>
        <div className="h-2 w-2 rotate-45 bg-[#4c535b] mt-[-4px]"></div>
      </div>
    </button>
  );
};

export default TooltipButton;
