"use client";

import React from "react";

const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-full w-32"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
};

const TransactionSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="text-right space-y-2">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
};

export const FullPageLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto p-8 w-full">
        <div className="grid grid-cols-3 gap-20">
          {/* Main content area skeleton */}
          <aside className="col-span-2 space-y-4">
            <div className="flex gap-20 items-center">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-9 bg-gray-200 rounded w-48 animate-pulse"></div>
              </div>
              <div className="h-13 bg-gray-200 rounded-full w-40 animate-pulse"></div>
            </div>

            {/* Chart skeleton */}
            <CardSkeleton />
          </aside>

          {/* Sidebar skeleton */}
          <aside className="col-span-1 space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-7 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            ))}
          </aside>
        </div>

        {/* Transactions section skeleton */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-full w-32 animate-pulse"></div>
            </div>
          </div>

          <div className="h-px bg-gray-200 mb-6"></div>

          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <TransactionSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FullPageLoading;
