"use client";

import { useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <RiErrorWarningLine className="text-4xl text-red-500" />
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <span className="mr-2">Try again</span>
        <span className="text-xl">
          <RiErrorWarningLine />
        </span>
      </button>
    </div>
  );
}
