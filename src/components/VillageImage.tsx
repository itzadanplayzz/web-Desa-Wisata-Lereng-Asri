import {useState} from 'react';
import {Mountain} from 'lucide-react';

interface VillageImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function VillageImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  priority = false,
}: VillageImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#e7efe9] via-[#f1eee5] to-[#e4decb] text-[#1b4d3e] p-6 text-center ${className}`}
      >
        <Mountain className="w-8 h-8 opacity-75" aria-hidden="true" />
        {fallbackTitle && (
          <span className="text-sm font-semibold text-[#1b4d3e]">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
