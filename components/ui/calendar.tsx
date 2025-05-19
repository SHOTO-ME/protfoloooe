"use client"

import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export function Calendar({
  selected,
  onChange,
  className = "",
  ...props
}: {
  selected?: Date | null
  onChange: (date: Date | null) => void
  className?: string
  [key: string]: any
}) {
  const [startDate, setStartDate] = useState<Date | null>(selected || null)

  const handleChange = (date: Date | null) => {
    setStartDate(date)
    onChange && onChange(date)
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      className={className}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

// Calendar component placeholder: react-day-picker removed due to React 19 incompatibility.
// Please replace with a compatible date picker such as react-datepicker if needed.

// TODO: Implement a new Calendar component using a React 19-compatible date picker.

export { };

