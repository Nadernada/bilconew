import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "../helpers/useClickOutside";

interface PopoverPickerProps {
  color: string; // Define the type for color as string
  onChange: (color: string) => void; // Define the type for onChange as a function
}

export const PopoverPicker: React.FC<PopoverPickerProps> = ({ color, onChange }) => {
  const popover = useRef(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div
        className="swatch w-6 h-6 rounded-sm"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="absolute bottom-full right-0" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
