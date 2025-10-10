"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PageHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.replace('/');
          }}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer z-50 relative"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      </div>
    </div>
  );
}
