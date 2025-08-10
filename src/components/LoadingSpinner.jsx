import { Loader2 } from 'lucide-react';

function LoadingSpinner({ size = 24, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 size={size} className="animate-spin text-indigo-600" />
    </div>
  );
}

export default LoadingSpinner;
