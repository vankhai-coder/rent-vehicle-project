import React, { useState } from 'react';

const DateRangePicker = ({ selectedDates, onDateChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (e) => {
        const date = new Date(e.target.value);
        if (isNaN(date.getTime())) return;

        const dateStr = date.toISOString().split('T')[0];
        const isSelected = selectedDates.some(d => d.toISOString().split('T')[0] === dateStr);

        let newDates;
        if (isSelected) {
            newDates = selectedDates.filter(d => d.toISOString().split('T')[0] !== dateStr);
        } else {
            newDates = [...selectedDates, date].sort((a, b) => a - b);
        }

        onDateChange(newDates);
    };

    const handleClearDates = () => {
        onDateChange([]);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={`grid gap-2 ${className || ''}`}>
            <div className="relative">
                <input
                    type="date"
                    onChange={handleDateSelect}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                />
                {selectedDates.length > 0 && (
                    <button
                        onClick={handleClearDates}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                )}
            </div>
            
            {selectedDates.length > 0 && (
                <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Selected dates:</p>
                    <div className="flex flex-wrap gap-1">
                        {selectedDates.map((date, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                {formatDate(date)}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker; 