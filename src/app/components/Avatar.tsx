"use client";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  className?: string;
  square?: boolean;
}

export function Avatar({ src, alt, initials, className = "", square = false }: AvatarProps) {
  const shapeClass = square ? "rounded-md" : "rounded-full";
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt || "Avatar"}
        className={`object-cover ${shapeClass} ${className}`}
      />
    );
  }

  if (initials) {
    return (
      <div className={`flex items-center justify-center font-medium bg-gradient-to-br from-cyan-500 to-blue-600 text-white ${shapeClass} ${className}`}>
        {initials}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white ${shapeClass} ${className}`}>
      <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>
  );
}
