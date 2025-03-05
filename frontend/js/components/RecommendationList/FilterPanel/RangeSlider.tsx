import React, { useState, useCallback } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  label: string;
  minDescription: string;
  maxDescription: string;
  onChange: (min: number, max: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  initialMin = min,
  initialMax = max,
  label,
  minDescription,
  maxDescription,
  onChange,
}) => {
  const [range, setRange] = useState([initialMin, initialMax]);

  // TODO: Add functionality where user can only set one range, meaning only one arg is passed in
  const handleRangeChange = useCallback((newRange: number | number[]) => {
    // Ensure `newRange` is an array of two numbers
    if (Array.isArray(newRange)) {
      const [newMin, newMax] = newRange;
      setRange([newMin, newMax]);
      onChange(newMin, newMax);
    }
  }, [onChange]);

  return (
    <div>
      <label>{label}</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Min Value Input with Description */}
        <div>
          <label>{minDescription}</label>
          <input
            type="number"
            value={range[0]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleRangeChange([Number(e.target.value), range[1]])}
            style={{ width: "80px", marginRight: "10px" }}
          />
        </div>

        {/* Range Slider with two handles */}
        <Slider
          range
          min={min}
          max={max}
          step={step}
          value={range}
          onChange={handleRangeChange}
          allowCross={false} // Prevent the handles from crossing each other
        />

        {/* Max Value Input with Description */}
        <div>
          <label>{maxDescription}</label>
          <input
            type="number"
            value={range[1]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleRangeChange([range[0], Number(e.target.value)])}
            style={{ width: "80px", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div>
        <span>Min: {range[0]}</span>
        <span>Max: {range[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
