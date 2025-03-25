import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange({ className, onDateChange }) {

  

  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  // Function to format date as a string
  const formatDateRange = (date) => {
    return date.from
      ? date.to
        ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
        : format(date.from, "LLL dd, y")
      : "Pick a date";
  };

  // Call `onDateChange` only AFTER state updates
  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(formatDateRange(date)); // ✅ Ensures latest state is used
    }
  }, [date, onDateChange]); // Runs when `date` changes

  // Handle date selection
  const handleDateChange = (newDate) => {
    if (!newDate) return;
    setDate(newDate); // ✅ Update state normally
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              "w-[230px] justify-start text-left font-normal bg-[#5937E0]",
              !date && " bg-[#5937E0]"
            )}
          >
            <CalendarIcon />
            {formatDateRange(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            fromDate={new Date()} // ✅ Prevents selecting past dates
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
