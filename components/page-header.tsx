"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PageHeader() {
  const router = useRouter();
  const [referrer, setReferrer] = useState<string>('/dashboard');

  useEffect(() => {
    // Check where user came from
    if (typeof window !== 'undefined' && document.referrer) {
      const referrerUrl = new URL(document.referrer);
      const referrerPath = referrerUrl.pathname;
      
      // If came from homepage, go back to homepage
      if (referrerPath === '/') {
        setReferrer('/');
      } else {
        // Otherwise go to dashboard
        setReferrer('/dashboard');
      }
    }
  }, []);

  const handleBack = () => {
    router.push(referrer);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={handleBack}
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
