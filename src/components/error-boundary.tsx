"use client";

import React from "react";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-[#131316]">
          Something went wrong!
        </h2>
        <p className="text-[#56616B] text-center max-w-md">
          {error.message ||
            "An unexpected error occurred while loading the data."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#131316] text-white rounded-lg font-semibold hover:bg-[#131316]/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
