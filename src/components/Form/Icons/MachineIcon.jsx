import React from "react";

export function MachineIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 81 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C4.03594 0 0 4.03594 0 9V49.5C0 54.4641 4.03594 58.5 9 58.5H33.75L32.2453 63H22.5C20.0109 63 18 65.0109 18 67.5C18 69.9891 20.0109 72 22.5 72H58.5C60.9891 72 63 69.9891 63 67.5C63 65.0109 60.9891 63 58.5 63H48.7547L47.25 58.5H72C76.9641 58.5 81 54.4641 81 49.5V9C81 4.03594 76.9641 0 72 0H9ZM72 9V40.5H9V9H72Z" />
    </svg>
  );
}
