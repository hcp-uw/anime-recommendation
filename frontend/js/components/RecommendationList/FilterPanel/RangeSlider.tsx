import React, { useState, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';

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
    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);

    const handleMinValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(Number(event.target.value), maxValue);
        setMinValue(newValue);
        onChange(newValue, maxValue);
    }, [maxValue, onChange]);

    const handleMaxValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(Number(event.target.value), minValue);
        setMaxValue(newValue);
        onChange(minValue, newValue);
    }, [minValue, onChange]);

    useEffect(() => {
        onChange(minValue, maxValue);
    }, [minValue, maxValue, onChange]);

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Min Value Input with Description */}
                <div>
                    <Form.Label>{minDescription}</Form.Label>
                    <Form.Control
                        type="number"
                        value={minValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleMinValueChange}
                        style={{ width: '80px', marginRight: '10px' }}
                    />
                </div>

                {/* Range Slider */}
                <Form.Range
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={handleMinValueChange}
                />
                <Form.Range
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={handleMaxValueChange}
                />

                {/* Max Value Input with Description */}
                <div>
                    <Form.Label>{maxDescription}</Form.Label>
                    <Form.Control
                        type="number"
                        value={maxValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleMaxValueChange}
                        style={{ width: '80px', marginLeft: '10px' }}
                    />
                </div>
            </div>
            <div>
                <span>Min: {minValue}</span>
                <span>Max: {maxValue}</span>
            </div>
        </Form.Group>
    );
};

export default RangeSlider;
