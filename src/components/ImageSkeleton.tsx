// components/ImageSkeleton.tsx
import React from "react";
import "../styles/ImageSkeleton.css";

const ImageSkeleton: React.FC = () => {
  return (
    <div className="image-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-text long"></div>
    </div>
  );
};

export default ImageSkeleton;