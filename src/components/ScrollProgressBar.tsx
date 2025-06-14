import { useScrollProgress } from '@/hooks/useScrollProgress';
import React from 'react'


export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
      <div
        className="h-2 bg-gradient-to-r from-indigo-400 to-indigo-900 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
