import { Button } from '@/components/Button';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LoadingPreview() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/generate-cv');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center gap-4">
        <Settings
          className="w-20 h-20 text-indigo-500 animate-spin"
          aria-label="Loading spinner"
          role="img"
        />
        <p className="text-center text-2xl font-semibold text-gray-800 font-fugaz">
          Loading Resume...
        </p>
        <Button onClick={handleRedirect} text="Generate Another" />
      </div>
    </div>
  );
}
