import { OctagonAlert, X } from 'lucide-react';
import React from 'react';

type CustomAlertProps = {
  message: string;
  onClose: () => void;
};

export default function CustomAlert({ message, onClose }: CustomAlertProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-indigo-50 border border-indigo-300 text-indigo-900 px-5 py-4 rounded-xl shadow-lg z-50 w-[70%] max-w-md">
      <div className="flex items-start gap-3 relative">
        <div className="flex items-center gap-2">
          <OctagonAlert className="w-5 h-5 text-indigo-600 mt-0.5" />
          <p className="font-semibold text-sm">Unable to generate your resume.</p>
        </div>
        
        <button onClick={onClose} className="absolute top-1 right-1 text-indigo-400 hover:text-indigo-600 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-indigo-800 mt-2 pl-7">{message}</p>
    </div>
  );
}
