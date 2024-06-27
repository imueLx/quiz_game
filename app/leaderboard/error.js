"use client";

import { RiErrorWarningLine } from "react-icons/ri";

export default function Error() {
  return (
    <div className="flex items-center justify-center h-screen">
      <RiErrorWarningLine className=" text-4xl text-red-500" />
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
