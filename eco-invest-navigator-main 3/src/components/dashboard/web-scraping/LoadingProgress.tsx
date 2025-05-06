
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface LoadingProgressProps {
  progress: number;
}

export const LoadingProgress = ({ progress }: LoadingProgressProps) => {
  return (
    <div className="space-y-2 my-4">
      <div className="flex justify-between text-sm">
        <span>Scraping in progress...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
